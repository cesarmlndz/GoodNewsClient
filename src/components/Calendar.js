import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Calendar(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar 
            sx={{
                color: "black",                            
            }}
            value={dayjs(props.listings[props.listings.length - 1]?.date_applied)}
        />
    </LocalizationProvider>
  )
}