// src/components/ScheduleView.jsx
import React, { useCallback } from 'react';
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
import DoctorResourceHeader from './DoctorResourceHeader';

export default function ScheduleView({ scheduleRef, events, doctors, onCellClick }) {
    const resourceHeaderTemplate = useCallback(props => <DoctorResourceHeader {...props} />, []);

    const onEventRendered = (args) => {
        const doc = doctors.find(d => d.Id === args.data.EmployeeId);
        if (args.element) args.element.style.background = doc?.Color || '#00BFFF';
    };

    return (
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
                eventSettings={{ dataSource: events }}
                group={{ enableCompactView: false, resources: ['Employee'] }}
            >
                <ResourcesDirective>
                    <ResourceDirective
                        field="EmployeeId"
                        name="Employee"
                        allowMultiple
                        dataSource={doctors}
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
    );
}
