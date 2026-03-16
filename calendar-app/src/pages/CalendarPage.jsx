import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../src/styles/calender.css';
import slide1 from '../assets/react.svg';

import { useDoctors } from '../hooks/useDoctors';
import { useSessions } from '../hooks/useSessions';
import { useSessionForm } from '../hooks/useSessionForm';

import SidebarNav from '../components/SidebarNav';
import CalendarToolbar from '../components/CalendarToolbar';
import AddSessionModal from '../components/AddSessionModal';
import ScheduleView from '../components/ScheduleView';
import { CalendarIcon, LogoutIcon } from '../components/icons/CalenderIcon';

export default function CalendarPage() {
  const scheduleRef = useRef(null);


  const [activeKey, setActiveKey] = useState('calendar');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);

  const { doctors, loading: doctorsLoading, error: doctorsError, refetch } = useDoctors({
    userType: 'RPA', clientId: '1000005', orgId: '1000008', sessionId: '1110857',
  });
  const sortedDoctors = useMemo(() => doctors?.slice().sort((a, b) => a.Text.localeCompare(b.Text)) || [], [doctors]);
  const doctorIds = useMemo(() => doctors?.map(d => d.Id).join(',') || '', [doctors]);

  const { sessions } = useSessions({
    Doctor_ID: doctorIds, FromDate: '2025-10-10', ToDate: '2025-11-11', Status: "'PND'",
    clientId: '1000005', orgId: '1000008', sessionId: '1110857',
  });

  useEffect(() => {
    if (sessions?.length) setEvents(sessions);
  }, [sessions]);

  const { isOpen, form, setForm, openModalForSlot, closeModal, handleSave } = useSessionForm(sortedDoctors, setEvents);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    const idToName = Object.fromEntries(sortedDoctors.map(d => [d.Id, d.Text.toLowerCase()]));
    return events.filter(
      ev => (ev.Subject?.toLowerCase().includes(q)) || (idToName[ev.EmployeeId]?.includes(q))
    );
  }, [events, search, sortedDoctors]);

  const onCellClick = (args) => openModalForSlot(args.startTime);

  const NAV = [
    { key: 'calendar', icon: <CalendarIcon />, label: 'Calendar' },
    { key: 'logout', icon: <LogoutIcon />, label: 'Logout' },
  ];

  return (
    <div className="layout">
      <SidebarNav activeKey={activeKey} setActiveKey={setActiveKey} NAV={NAV} logoSrc={slide1} />

      <main className="main">
        <CalendarToolbar
          search={search}
          setSearch={setSearch}
          onRefresh={refetch}
          onAddSession={() => openModalForSlot(scheduleRef.current?.selectedDate || new Date())}
          addDisabled={doctorsLoading || doctorsError || !sortedDoctors.length}
        />

        <AddSessionModal
          isOpen={isOpen}
          onClose={closeModal}
          doctors={sortedDoctors}
          form={form}
          setForm={setForm}
          onSave={handleSave}
        />

        { }
        <ScheduleView
          scheduleRef={scheduleRef}
          events={filteredEvents}
          doctors={sortedDoctors}
          onCellClick={onCellClick}
        />
      </main>
    </div>
  );
}



// useState =>يخليك تخزن بيانات تتغير داخل الكومبوننت، وكلما تتغير القيمة يصير re-render للصفحة
// استخدمه من عندك إذا عندك قيمة محلية داخل الكومبوننت وتتغير حسب التفاعل.


// useEffect =>يسمح لك تنفّذ كود بعد ما يصير render للصفحة.
// استخدمه من عندك إذا عندك كود لازم يشتغل مرة واحدة عند تحميل الصفحة، أو كلما تتغير بيانات معينة.


// useMemo =>يسمح لك تخزّن نتيجة حساب معين وتمنع إعادة حسابه إلا إذا تغيرت البيانات اللي يعتمد عليها.
// استخدمه من عندك إذا عندك عمليات حسابية مكلفة أو تحويل بيانات، عشان تحسّن أداء الصفحة.


// useRef =>يسمح لك تحتفظ بمرجع لعنصر DOM أو قيمة معينة، وتمنع إعادة إنشائه عند كل render.
// استخدمه من عندك إذا عندك حاجة توصل لعنصر في الصفحة أو تخزّن قيمة ما تتغير مع كل render.



// هنا تم استيراد React وبعض الـ hooks:
// useState لإدارة state
// useEffect لتنفيذ كود عند تغيّر البيانات
// useMemo لتحسين الأداء وحساب القيم المشتقة
// useRef للاحتفاظ بمرجع إلى عنصر أو كومبوننت