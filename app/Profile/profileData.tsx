"use client";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Description, Bookmark, Settings } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileData = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user || {
    name: "Guest",
    email: "Not logged in",
  };

  const options = [
    {
      label: "My Resume",
      icon: <Description />,
      action: () => router.push("/Profile/resume"),
    },
    {
      label: "Saved Jobs",
      icon: <Bookmark />,
      action: () => alert("Show Saved Jobs"),
    },
    {
      label: "Settings",
      icon: <Settings />,
      action: () => alert("Open Settings"),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          maxWidth: 600,
          borderRadius: 4,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Box textAlign="center" mb={4}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "auto",
                bgcolor: "primary.main",
              }}
            >
              {user.name?.[0]}
            </Avatar>
            <Typography variant="h5" mt={2}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Grid container spacing={2} direction="column">
            {options.map((option) => (
              <Grid item key={option.label}>
                <Button
                  onClick={option.action}
                  fullWidth
                  variant="outlined"
                  startIcon={option.icon}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: "bold",
                  }}
                >
                  {option.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileData;
