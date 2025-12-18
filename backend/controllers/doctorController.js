import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const doctorId = req.body.doctorId;
        const docData = await Doctor.findById(doctorId);
        await Doctor.findByIdAndUpdate(doctorId, { availability: !docData.availability });
        res.status(200).json({ success: true, message: "availability changed successfully" });
    } catch (error) {
        console.error("Error in changeAvailability:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const getDoctorList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('-password');

        res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error("Error in allDoctors:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(200).json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(200).json({ success: false, message: "Invalid Credentials" });
        }
        if (isMatch) {
            const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET);
            return res.status(200).json({ success: true, message: "Login Successful", token });
        }


    } catch (error) {
        console.error("Error in loginDoctor:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const appointmentsByDoctor = async (req, res) => {
    try {

        const doctorId = req.body.doctorId;

        const appointments = await Appointment.find({ doctorId });

        if (!appointments) {
            return res.status(200).json({ success: false, message: "No appointments found" });
        }
        res.status(200).json({ success: true, appointments });
    }
    catch (error) {
        console.error("Error in appointmentsByDoctor:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const appointmentCompleted = async (req, res) => {
    try {
        const { appointmentId, doctorId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);
        if (!appointmentData) {
            return res.status(200).json({ success: false, message: "Appointment not found" });
        }
        if (appointmentData && appointmentData.doctorId == doctorId) {
            await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: "true" });
            return res.status(200).json({ success: true, message: "Appointment marked as completed" });
        }
        else {
            return res.status(200).json({ success: false, message: "Unauthorized action" });
        }
    } catch (error) {
        console.error("Error in appointmentCompleted:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const appointmentCancelled = async (req, res) => {
    try {
        const { appointmentId, doctorId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);
        if (!appointmentData) {
            return res.status(200).json({ success: false, message: "Appointment not found" });
        }
        if (appointmentData && appointmentData.doctorId == doctorId) {
            await Appointment.findByIdAndUpdate(appointmentId, { cancelled: "true" });
            return res.status(200).json({ success: true, message: "Appointment marked as cancelled" });
        }
        else {
            return res.status(200).json({ success: false, message: "Unauthorized action" });
        }
    } catch (error) {
        console.error("Error in appointmentCompleted:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const doctordashboard = async (req, res) => {
    try {
        const doctorId = req.body.doctorId;
        const appointments = await Appointment.find({ doctorId });
        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted && !item.cancelled || item.payment) {
                earnings += item.amount;
            }
        })
        let patients = [];
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });
        const dashData = {
            totalAppointments: appointments.length,
            totalEarnings: earnings,
            totalPatients: patients.length,
            latestAppointments: appointments.slice(-5).reverse(),
        }
        res.status(200).json({ success: true, dashData });
    }


    catch (error) {
        console.error("Error in doctordashboard:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const doctorProfile = async (req, res) => {
    try {
        const doctorId = req.body.doctorId;
        const doctor = await Doctor.findById(doctorId).select('-password');
        if (!doctor) {
            return res.status(200).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, doctor });
    }
    catch (error) {
        console.error("Error in doctorProfile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const updateDoctorProfile = async (req, res) => {
    try {

        const { doctorId, fees, address, available } = req.body;
        await Doctor.findByIdAndUpdate(doctorId, { fees, address, available });
        res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        console.error("Error in updateDoctorProfile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {
    changeAvailability, getDoctorList, loginDoctor, appointmentsByDoctor,
    appointmentCompleted,
    appointmentCancelled, doctordashboard, doctorProfile, updateDoctorProfile
};