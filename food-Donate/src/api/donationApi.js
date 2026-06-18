import api from "./axios";

// ================= GET ALL DONATIONS =================

export const getDonations = () =>{
  const token = localStorage.getItem("token");
  return api.get("/donations",{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });}

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

// ================= GET PICKUPS  =================
export const getPickups = () =>{
  const token = localStorage.getItem("token");
  return api.get("/volunteers/pickups",{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })}
 
export const getVolunteers = () =>{ 
  const token = localStorage.getItem("token"); 
  return api.get("/volunteers",{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
}

// ================= UPDATE DONATION STATUS =================
export const updateDonationStatus = (id, status) =>
  api.put(`/donations/status/${id}`, { status });

// ================= DELETE VOLUNTEER  =================
export const deleteVolunteerById = (id) => api.delete(`/volunteers/${id}`);

// ================= GET ALL NGOS  =================
export const getAllNgos = () => api.get("/auth/ngos");

// ================= GET PUBLIC LIVE DONATIONS  =================
export const getPublicLiveDonations = () => api.get("/donations/public");

// ================= PUBLIC STATS  =================
export const getPublicStats = () => api.get("/donations/stats"); 