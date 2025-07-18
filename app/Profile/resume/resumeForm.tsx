"use client";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import OtpLogin from "./otpLogin";
import { CheckCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { degreeOptions, collegeOptions, skillOptions } from "@/app/Data";

const steps = [
  "Personal Details",
  "Professional Summary",
  "Education & Skills",
];

const ResumeForm = () => {
  const { data: session } = useSession();
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    city: "",
    country: "",
    linkedIn: "",
    github: "",
    professionalSummary: "",
    education: [{ degree: "", college: "", year: "" }] as {
      degree: string;
      college: string;
      year: string;
    }[],
    skills: [] as string[],
    hasResume: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      hasResume: true,
    }));
  };

  useEffect(() => {
    const fetchPhone = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await axios.post("http://localhost:3001/get-phone", {
          email: session.user.email,
        });

        if (res.data.phone) {
          setVerifiedPhoneNumber(res.data.phone);
        }
      } catch (err) {
        console.log("Error fetching phone number:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [session]);

  useEffect(() => {
    const fetchResumeStatus = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await axios.post("http://localhost:3001/get-resume", {
          email: session.user.email,
        });

        console.log("Raw resume response:", res.data);

        if (!res.data || Object.keys(res.data).length === 0) {
          console.warn("No resume data found for:", session.user.email);
          return;
        }
        const resumeData = res.data;

        setFormData((prev) => ({
          ...prev,
          city: resumeData.city || "",
          country: resumeData.country || "",
          linkedIn: resumeData.linkedin || "",
          github: resumeData.github || "",
          professionalSummary: resumeData.professionalsummary || "",
          education: [
            {
              degree: resumeData.education[0]?.degree,
              college: resumeData.education[0]?.college,
              year: resumeData.education[0]?.year,
            },
          ],
          skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
        }));
      } catch (err) {
        console.log("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeStatus();
  }, [session]);

  const handleNext = () => {
    if (verifiedPhoneNumber) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      alert("Please verify your phone number before proceeding.");
    }
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3001/update-user", {
      ...formData,
      email: session?.user?.email,
    });
  };

  const getInputProps = (value: string) => ({
    disabled: !!value, // disable if data already exists
    sx: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
        backgroundColor: value ? "#f5f5f5" : "white",
      },
    },
  });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const renderStepForm = () => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              color="success"
              margin="normal"
              value={session?.user?.name || ""}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              color="success"
              value={session?.user?.email || ""}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
            {verifiedPhoneNumber ? (
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                color="success"
                value={verifiedPhoneNumber}
                disabled
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CheckCircleOutline color="success" />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <OtpLogin onVerified={(phone) => setVerifiedPhoneNumber(phone)} />
            )}
            {verifiedPhoneNumber && (
              <>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="City"
                    name="city"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.city}
                    onChange={handleChange}
                    {...getInputProps(formData.city)}
                  />
                  <TextField
                    label="Country"
                    name="country"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.country}
                    onChange={handleChange}
                    {...getInputProps(formData.city)}
                  />
                </Box>
                <TextField
                  label="LinkedIn Profile URL"
                  name="linkedIn"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  {...getInputProps(formData.city)}
                />

                <TextField
                  label="GitHub Profile URL"
                  name="github"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.github}
                  onChange={handleChange}
                  {...getInputProps(formData.city)}
                />
              </>
            )}
          </>
        );
      case 1:
        return (
          <TextField
            name="professionalSummary"
            label="Professional Summary"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.professionalSummary}
            onChange={handleChange}
            color="success"
            {...getInputProps(formData.city)}
          />
        );
      case 2:
        return (
          <>
            {formData.education.map((edu, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Autocomplete
                  freeSolo
                  options={degreeOptions}
                  value={edu.degree}
                  disabled={!!edu.degree}
                  onInputChange={(event, newValue) => {
                    if (!edu.degree) {
                      const newEducation = [...formData.education];
                      newEducation[index].degree = newValue;
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Degree"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          backgroundColor: edu.degree ? "#f5f5f5" : "white",
                        },
                      }}
                    />
                  )}
                />

                <Autocomplete
                  freeSolo
                  options={collegeOptions}
                  value={edu.college}
                  disabled={!!edu.college}
                  onInputChange={(event, newValue) => {
                    if (!edu.college) {
                      const newEducation = [...formData.education];
                      newEducation[index].college = newValue;
                      setFormData((prev) => ({
                        ...prev,
                        education: newEducation,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          backgroundColor: edu.college ? "#f5f5f5" : "white",
                        },
                      }}
                    />
                  )}
                />
                <TextField
                  label="Year"
                  name="year"
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].year = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                  fullWidth
                  {...getInputProps(edu.year)}
                />
              </Box>
            ))}
            <Autocomplete
              multiple
              freeSolo
              options={skillOptions}
              value={formData.skills}
              readOnly={formData.skills.length > 0}
              onChange={(_, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  skills: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  name="skills"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  color="success"
                  placeholder={formData.skills.length > 0 ? "" : "Add skills"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      backgroundColor:
                        formData.skills.length > 0 ? "#f5f5f5" : "white",
                    },
                  }}
                />
              )}
            />
          </>
        );
    }
  };

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #e0eafc, #cfdef3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
          px: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 700,
            borderRadius: 10,
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepForm()}
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              disabled={step === 0}
              onClick={handleBack}
              sx={{
                borderRadius: "20px",
                paddingX: 4,
                paddingY: 1.5,
              }}
            >
              ← Back
            </Button>
            {step === steps.length - 1 ? (
              formData.hasResume ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "20px",
                    paddingX: 4,
                    paddingY: 1.5,
                  }}
                >
                  🎯 Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    borderRadius: "20px",
                    paddingX: 4,
                    paddingY: 1.5,
                  }}
                >
                  🎯 Submit
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  borderRadius: "20px",
                  paddingX: 4,
                  paddingY: 1.5,
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Card>
      </Box>
    </div>
  );
};
export default ResumeForm;
