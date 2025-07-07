"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const steps = ["📝 Basic Info", "📋 Details", "Salary", "✅ Review"];

const JobForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
  });

  useEffect(() => {
    if (session?.user.role == "seeker") {
      router.push("/Jobs");
    }
  }, [session]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/add-job", {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        description: formData.description,
        requirements: formData.requirements,
        minSalary: formData.minSalary,
        maxSalary: formData.maxSalary,
        applicationDeadline: formData.applicationDeadline,
      });
      console.log("Job added successfully:", response.data);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box
            display="grid"
            gap={3}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          >
            <TextField
              label="Job Title"
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Company"
              name="company"
              fullWidth
              value={formData.company}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                label="Job Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box display="grid" gap={3}>
            <TextField
              label="Job Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Job Requirements"
              name="requirements"
              multiline
              rows={4}
              fullWidth
              value={formData.requirements}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Application Deadline"
              name="applicationDeadline"
              type="date"
              fullWidth
              value={formData.applicationDeadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Box>
        );
      case 2:
        return (
          <Box
            display="grid"
            gap={3}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          >
            <TextField
              label="Minimum Salary (₹)"
              name="minSalary"
              type="number"
              fullWidth
              value={formData.minSalary}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Maximum Salary (₹)"
              name="maxSalary"
              type="number"
              fullWidth
              value={formData.maxSalary}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Job Listing
            </Typography>
            {Object.entries(formData).map(([key, value]) => (
              <Typography key={key} sx={{ my: 1 }}>
                <strong>{key.toUpperCase()}:</strong> {value}
              </Typography>
            ))}
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 5,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 6,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          p: 4,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ borderRadius: 4, mb: 3, boxShadow: "none" }}>
          <CardContent>{renderStep(activeStep)}</CardContent>
        </Card>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            ← Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="success" onClick={handleSubmit}>
              🎯 Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next →
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobForm;
