import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Stack, 
  Grid, 
  Container,
  Paper,
  Fade,
  InputAdornment,
  IconButton
} from "@mui/material";
import { 
  Email as EmailIcon, 
  MeetingRoom as RoomIcon,
  ArrowForward as ArrowForwardIcon 
} from "@mui/icons-material";
import useSocketStore from "../store/socketStore";
import img from "../assets/lobby-page-illustrator.png";

const LobbyScreen = () => {
  const navigate = useNavigate();
  const socket = useSocketStore((state) => state.socket);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      socket.emit("room:join", { email, room });
      // Reset form after a brief delay
      setTimeout(() => {
        setEmail("");
        setRoom("");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error joining room:", error);
    }
  };

  const handleJoinRoom = (data) => {
    const { room } = data;
    navigate(`/room/${room}`);
  };

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              textAlign: "center",
              pt: 4,
              pb: 2,
              fontWeight: 700,
              background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              fontSize: { xs: "2.5rem", md: "3.5rem" }
            }}
          >
            CodeMeet
          </Typography>
        </Fade>

        <Grid
          container
          spacing={6}
          sx={{
            minHeight: "calc(100vh - 200px)",
            alignItems: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000} style={{ transitionDelay: "200ms" }}>
              <Paper
                elevation={24}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  maxWidth: 500,
                  mx: "auto",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                    borderRadius: "16px 16px 0 0",
                  },
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h2"
                  gutterBottom 
                  textAlign="center"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 4,
                    fontSize: { xs: "1.8rem", md: "2.2rem" }
                  }}
                >
                  Join a Room
                </Typography>

                <form onSubmit={handleJoin}>
                  <Stack spacing={4}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#667eea",
                        },
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Room Code"
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RoomIcon sx={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#667eea",
                        },
                      }}
                    />
                    
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 2,
                        borderRadius: 2,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)",
                          boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                          transform: "translateY(-2px)",
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                        "&.Mui-disabled": {
                          background: "rgba(0, 0, 0, 0.12)",
                          color: "rgba(0, 0, 0, 0.26)",
                        },
                      }}
                    >
                      {isLoading ? "Joining..." : "Join Room"}
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Fade>
          </Grid>

          {/* Description Section */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000} style={{ transitionDelay: "400ms" }}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Box
                  component="img"
                  src={img}
                  alt="CodeMeet Illustration"
                  sx={{
                    width: "100%",
                    maxWidth: 600,
                    height: "auto",
                    mb: 4,
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    color: "white",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: 500,
                    mx: "auto",
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  Your collaborative coding platform where developers unite to share ideas, 
                  solve problems, and conduct real-time coding sessions. 
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    mt: 2,
                    fontWeight: 300,
                    maxWidth: 400,
                    mx: "auto",
                    fontSize: { xs: "0.95rem", md: "1rem" },
                  }}
                >
                  Enter your email and room code to start your collaborative journey.
                </Typography>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LobbyScreen