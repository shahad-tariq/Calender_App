

import { useMemo } from 'react';
import { useGetDoctorsQuery } from '../domain/api/doctorsApi';
import { resolveImageUrl } from '../utils/resolveImageUrl';

export function useDoctors(params) {
  const {
    data: rawDoctors = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDoctorsQuery(params ?? {}, { refetchOnMountOrArgChange: false });

  const doctors = useMemo(() => {
    if (!rawDoctors || rawDoctors.length === 0) {
      console.log('No raw doctors data available');
      return [];
    }

    const processedDoctors = rawDoctors.map((d, idx) => ({
      Text: d?.name || `Doctor ${0}`,
      Id: Number(d?.c_BPARTNER_ID) || 0,
      GroupId: 1,
      Color: String(d?.isAvilable || '').toUpperCase() === 'Y' ? '#16A085' : '#B0BEC5',
      Designation: 'Doctor',
      Avatar: resolveImageUrl(d?.imageURL),
      _raw: d,
    }));

    console.log('Processed doctors:', processedDoctors);
    return processedDoctors;
  }, [rawDoctors]);

  return {
    doctors,
    rawDoctors,
    loading: isLoading,
    error: isError ? (error?.message || 'Failed to load doctors') : null,
    refetch,
  };
}


