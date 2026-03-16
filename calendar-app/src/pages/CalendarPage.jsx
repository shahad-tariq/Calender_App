import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  ViewsDirective,
  ViewDirective,
  Inject,
  TimelineViews,
  TimelineMonth,
  Day,
  Resize,
  DragAndDrop
} from '@syncfusion/ej2-react-schedule';

import '../src/styles/calender.css';
import slide1 from '../assets/react.svg';

import { useDoctors } from '../hooks/useDoctors';
import { useSessions } from '../hooks/useSessions';
import DoctorResourceHeader from '../components/DoctorResourceHeader';
import AddSessionModal from '../components/AddSessionModal';
import SidebarNav from '../components/SidebarNav';
import CalendarToolbar from '../components/CalendarToolbar';

export default function CalendarPage() {
  const scheduleRef = useRef(null);

  const [activeKey, setActiveKey] = useState('calendar');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    Subject: '',
    Patient: '',
    Status: 'Pending',
    EmployeeId: undefined,
    StartTime: new Date(),
    EndTime: new Date(),
  });


  // تحميل الدكاترة
  const { doctors, loading: doctorsLoading, error: doctorsError, refetch } = useDoctors({
    userType: 'RPA',
    clientId: '1000005',
    orgId: '1000008',
    sessionId: '1110857',
  });

  const doctorIds = useMemo(() => doctors?.map(d => d.Id).join(',') || '', [doctors]);

  // تحميل الجلسات
  const { sessions } = useSessions({
    Doctor_ID: doctorIds,
    FromDate: '2025-10-10',
    ToDate: '2025-11-11',
    Status: "'PND'",
    clientId: '1000005',
    orgId: '1000008',
    sessionId: '1110857',
  });

  useEffect(() => {
    if (sessions?.length) setEvents(sessions);
  }, [sessions]);

  const sortedDoctors = useMemo(() => doctors?.slice().sort((a, b) => a.Text.localeCompare(b.Text)) || [], [doctors]);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    const idToName = Object.fromEntries(sortedDoctors.map(d => [d.Id, d.Text.toLowerCase()]));
    return events.filter(
      ev => (ev.Subject?.toLowerCase().includes(q)) || (idToName[ev.EmployeeId]?.includes(q))
    );
  }, [events, search, sortedDoctors]);

  const resourceHeaderTemplate = useCallback(props => <DoctorResourceHeader {...props} />, []);

  const onEventRendered = (args) => {
    const doc = sortedDoctors.find(d => d.Id === args.data.EmployeeId);
    if (args.element) args.element.style.background = doc?.Color || '#00BFFF';
  };

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

  const onCellClick = (args) => openModalForSlot(args.startTime);

  const handleSave = () => {
    if (!form.EmployeeId) return;
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

const Icons = { 
  calendar: ( <svg width="22" height="22" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="2" /> <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> </svg> ), 
  logout: ( <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10 4h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" /> <path d="M15 12H4m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> </svg> ), }; 
  
  
  const NAV = [ { key: 'calendar', icon: Icons.calendar, label: 'Calendar' }, 
    { key: 'logout', icon: Icons.logout, label: 'Logout' }, ];
  

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
          onClose={() => setIsOpen(false)}
          doctors={sortedDoctors}
          form={form}
          setForm={setForm}
          onSave={handleSave}
        />

        <div className="control-section">
          <ScheduleComponent
            ref={scheduleRef}
            cssClass="block-events"
            width="100%"
            height="650px"
            selectedDate={new Date()}
            currentView="TimelineDay"
            showQuickInfo={false}
            cellClick={onCellClick}
            resourceHeaderTemplate={resourceHeaderTemplate}
            eventRendered={onEventRendered}
            eventSettings={{ dataSource: filteredEvents }}
            group={{ enableCompactView: false, resources: ['Employee'] }}
          >
            <ResourcesDirective>
              <ResourceDirective
                field="EmployeeId"
                name="Employee"
                allowMultiple
                dataSource={sortedDoctors}
                textField="Text"
                idField="Id"
                colorField="Color"
              />
            </ResourcesDirective>

            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="TimelineDay" />
              <ViewDirective option="TimelineMonth" />
            </ViewsDirective>

            <Inject services={[Day, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </main>
    </div>
  );
}
