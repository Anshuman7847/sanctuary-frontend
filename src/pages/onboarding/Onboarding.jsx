import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";

import { useNavigate } from 'react-router-dom';

import { AiFillHeart } from 'react-icons/ai';
import { GiLightningHelix, GiMeditation } from 'react-icons/gi';
import { FaPalette } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const Achieve = () => {
  const [selected, setSelected] = useState("Health");
  const navigate = useNavigate();

  const categories = [
  { label: "Health", icon: <AiFillHeart /> },
  { label: "Productivity", icon: <GiLightningHelix /> },
  { label: "Mindfulness", icon: <GiMeditation /> },
  { label: "Creative", icon: <FaPalette /> },
  ];

  return (
    <div className="h-[92vh] w-[100%] flex items-center justify-center bg-gradient-to-r from-gray-100 to-orange-50">
      <Card className="w-[420px] h-[95%] rounded-3xl shadow-xl p-8 relative">

        {/* STEP HEADER */}
        <div className="flex justify-between items-center mb-3">
          <Typography className="text-xs text-gray-500">
            STEP 1 OF 3
          </Typography>

          <Typography className="text-xs text-indigo-500 font-semibold">
            GETTING STARTED
          </Typography>
        </div>

        <LinearProgress
          variant="determinate"
          value={35}
          sx={{
            height: 6,
            borderRadius: 5,
            marginBottom: "20px",
          }}
        />

        {/* TITLE */}
        <Typography variant="h4" fontWeight="bold" className="mb-2">
          What do you want to achieve today? 👋
        </Typography>

        <Typography className="text-gray-500 text-sm mb-6">
          Select your focus areas to personalise your wellness sanctuary
          experience.
        </Typography>

        {/* CATEGORY TITLE */}
        <Typography className="text-xs text-gray-400 mb-3">
          SELECT CATEGORIES
        </Typography>

        {/* CATEGORY BUTTONS */}
        <Box className="flex flex-wrap gap-3 mb-6">
          {categories.map((item) => (
            <Chip
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => setSelected(item.label)}
              sx={{
                padding: "18px 10px",
                borderRadius: "999px",
                fontWeight: 500,
                backgroundColor:
                  selected === item.label ? "#4F46E5" : "#F1F1F1",
                color: selected === item.label ? "#fff" : "#555",
              }}
            />
          ))}
        </Box>

        {/* IMAGE + CARD SECTION */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2 h-[110px] bg-gray-200 rounded-2xl flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597"
              alt="meditation"
              className="h-full w-full object-cover rounded-2xl opacity-70"
            />
          </div>

          <div className="w-1/2 h-[110px] bg-orange-200 rounded-2xl p-4 flex flex-col justify-center">
            <Typography fontWeight="bold" className="text-sm">
              Focus on balance.
            </Typography>

            <Typography className="text-xs text-gray-700">
              DAILY INSIGHT
            </Typography>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center">
          <Typography className="text-sm text-gray-400 cursor-pointer">
            Skip for now
          </Typography>

          <Button
            variant="contained"
            endIcon={<FiArrowRight />}
            sx={{
              borderRadius: "999px",
              padding: "10px 28px",
              textTransform: "none",
              background:
                "linear-gradient(90deg,#6366F1,#4F46E5)",
            }}
            onClick={() => navigate('/dashboard')}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Achieve;