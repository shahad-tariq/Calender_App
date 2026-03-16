import { useState } from 'react';

export function useSessionForm(sortedDoctors, setEvents) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        Subject: '',
        Patient: '',
        Status: 'Pending',
        EmployeeId: undefined,
        StartTime: new Date(),
        EndTime: new Date(),
    });

    const openModalForSlot = (start) => {
        setForm({
            Subject: '',
            Patient: '',
            Status: 'Pending',
            EmployeeId: sortedDoctors[0]?.Id,
            StartTime: start,
            EndTime: new Date(start.getTime() + 30 * 60000),
        });
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const handleSave = () => {
        if (!form.EmployeeId) return;

        // Add the new event locally
        setEvents(prev => [
            ...prev,
            {
                Id: Date.now(),
                Subject: form.Subject,
                StartTime: new Date(form.StartTime),
                EndTime: new Date(form.EndTime),
                EmployeeId: Number(form.EmployeeId),
                Patient: form.Patient,
                Status: form.Status,
            },
        ]);

        setIsOpen(false);
    };

    return { isOpen, form, setForm, openModalForSlot, closeModal, handleSave };
}
