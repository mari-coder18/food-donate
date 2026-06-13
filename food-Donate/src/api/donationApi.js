import api from "./axios";

// ================= GET ALL DONATIONS =================
export const getDonations = () =>
  api.get("/donations");

// ================= GET SINGLE DONATION =================
export const getDonationById = (id) =>
  api.get(`/donations/${id}`);

// ================= CREATE DONATION =================
export const createDonation = (data) =>
  api.post("/donations", data);

// ================= UPDATE DONATION =================
export const updateDonation = (id, data) =>
  api.put(`/donations/${id}`, data);

// ================= DELETE DONATION =================
export const deleteDonation = (id) =>
  api.delete(`/donations/${id}`);

// ================= GET PICKUPS (🔥 FIXED) =================
export const getPickups = () =>
  api.get("/volunteers/pickups");

// ================= UPDATE DONATION STATUS =================
export const updateDonationStatus = (id, status) =>
  api.put(`/donations/status/${id}`, { status });