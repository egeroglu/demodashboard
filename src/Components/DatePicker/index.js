import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function BasicDatePicker(fromDate, todate, onDateChange) {
    const [selectFrom, setSelectedFrom] = React.useState(null);
    const [selectedTo, setSelectedTo] = React.useState(dayjs(new Date()));    
    
    const handleFromChange = (date) => {
        setSelectedFrom(date);
    };
    const handleToChange = (date) => {
        setSelectedTo(date);
    };
    const handleEnterClick = () => {
        onDateChange();
    };
    console.log(fromDate)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
            label="From"
            defaultValue={dayjs('2022-12-19')}
            onChange={handleFromChange}
        />
        <DatePicker
            label="To"
            value={selectedTo}
            onChange={handleToChange}
        />
        <IconButton onClick={handleEnterClick} sx={{ border: '1px solid', borderRadius: '50%' }}>
          <KeyboardReturnIcon />
        </IconButton>
      </DemoContainer>
    </LocalizationProvider>
  );
}
