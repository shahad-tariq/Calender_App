import { useMemo } from 'react';
import { useGetSessionsQuery } from '../features/api/sessionsApi';

export function useSessions(params) {
  const {
    data: rawSessions = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSessionsQuery(params ?? {}, { refetchOnMountOrArgChange: false });

  const sessions = useMemo(() => {
    if (!rawSessions || rawSessions.length === 0) return [];

    return rawSessions.map((d, idx) => {
      const toISODate = (dateStr) => {
        if (!dateStr) return null;
        const isoStr = dateStr.includes('T')
          ? dateStr
          : dateStr.replace(' ', 'T'); 
        const dt = new Date(isoStr);
        return isNaN(dt.getTime()) ? null : dt;
      };

      const startTime = toISODate(d.startDateTime) || new Date();
      const endTime = toISODate(d.endDateTime) || new Date(startTime.getTime() + 30 * 60000);

      return {
        Id: Number(d.sessionID) || (1000 + idx),
        Subject: d.patientName || `Session ${d.sessionID || idx + 1}`,
        StartTime: startTime,
        EndTime: endTime,
        EmployeeId: Number(d.doctorID) || 1,
        Patient: d.patientName || 'Unknown',
        Status: d.sessionStatus || 'Unknown',
        _raw: d,
      };
    });
  }, [rawSessions]);

  return {
    sessions,
    rawSessions,
    loading: isLoading,
    error: isError ? (error?.message || 'Failed to load sessions') : null,
    refetch,
  };
}
