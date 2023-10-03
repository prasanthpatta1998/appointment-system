const express = require('express');
const cors =  require('cors')
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors())


const doctors = [
    {
      "id": 1,
      "name": "Dr. John Smith",
      "specialty": "Cardiologist",
      "available_days": ["Monday", "Wednesday", "Friday"],
      "max_patients_per_day": 10
    },
    {
      "id": 2,
      "name": "Dr. Lisa Johnson",
      "specialty": "Dermatologist",
      "available_days": ["Tuesday", "Thursday"],
      "max_patients_per_day": 8
    }
]
const appointments = [];


// Get a list of doctors
app.get('/api/doctors', (req, res) => {
  res.json({ doctors });
});

// Get detailed information about a specific doctor
app.get('/api/doctors/:doctorId', (req, res) => {
  const { doctorId } = req.params;
  const doctor = doctors.find((d) => d.id === parseInt(doctorId));
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
    return;
  }
  res.json(doctor);
});

// Book an appointment
app.post('/api/appointments', (req, res) => {
  const { doctor_id, patient_name, appointment_date, appointment_time } = req.body;
  const appointment = {
    id: appointments.length + 1,
    doctor_id,
    patient_name,
    appointment_date,
    appointment_time,
    status: 'confirmed',
  };
  appointments.push(appointment);
  res.status(201).json(appointment);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
