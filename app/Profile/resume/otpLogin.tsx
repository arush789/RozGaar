import { phoneAdd } from "@/app/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { auth } from "@/firebase";
import { Button, CircularProgress, TextField } from "@mui/material";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const OtpLogin = ({ onVerified }: { onVerified: (phone: string) => void }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [recapthaVerifier, setRecapthaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    setRecapthaVerifier(recaptcha);

    return () => {
      recaptcha.clear();
    };
  }, []);

  useEffect(() => {
    const hasEnterdOtp = otp.length === 6;
    if (hasEnterdOtp) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");
      if (!confirmationResult) {
        setError("No confirmation result found. Please request OTP first.");
        return;
      }
      try {
        await confirmationResult.confirm(otp);

        await phoneAdd({
          phoneNumber,
          email: session?.user?.email || "",
        });
        onVerified(phoneNumber);
      } catch (error) {
        setError("Invalid OTP. Please try again.");
        console.error("OTP verification failed:", error);
      }
    });
  };

  const requestOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();

    setResendCountdown(30);

    startTransition(async () => {
      setError("");
      if (!recapthaVerifier) {
        setError("Recaptcha not initialized");
        return;
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recapthaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully!");
      } catch (error: any) {
        setResendCountdown(0);

        if (error.code === "auth/invalid-phone-number") {
          setError("Invalid phone number format. Please include country code.");
        } else if (error.code === "auth/missing-phone-number") {
          setError("Phone number is required.");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      }
    });
  };

  return (
    <div>
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!error}
            helperText={error || "Enter your phone number with country code"}
          />
        </form>
      )}

      {confirmationResult && (
        <div className="mt-4">
          <InputOTP
            maxLength={6}
            onChange={(value) => setOtp(value)}
            value={otp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => requestOtp()}
        disabled={isPending || resendCountdown > 0 || !phoneNumber}
        sx={{ mt: 2 }}
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}s`
          : isPending
          ? "Sending OTP..."
          : "Request OTP"}
      </Button>

      <div>{success && <p style={{ color: "green" }}>{success}</p>}</div>
      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>

      {/* Recaptcha container */}
      <div id="recaptcha-container"></div>

      {isPending && <CircularProgress />}
    </div>
  );
};

export default OtpLogin;
