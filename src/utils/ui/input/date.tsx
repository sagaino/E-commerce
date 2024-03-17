import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'

import "react-datepicker/dist/react-datepicker.css";
import DatePickerWrapper from '@/utils/libs/react-datepicker';


type CustomDatePickerType = {
  initDate?: Date
  onChange: (value: Date) => void
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const CustomDatePicker: React.FC<CustomDatePickerType> = (data: CustomDatePickerType) => {
  const { onChange, initDate } = data

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!initDate) return
    setStartDate(initDate)

    return () => {
      setStartDate(new Date())
    }
  }, [initDate])

  const onChangeDate = (value: Date | null) => {
    if (!value) return
    setStartDate(value)
    onChange(value)
  }

  return (
    <Box sx={{
      '& .react-datepicker-popper': {
        zIndex: 10000
      },
    }}>
      <DatePicker
        showIcon
        // icon={<Box><CalendarMonthIcon /></Box>}
        // wrapperClassName="!w-full"
        maxDate={(new Date())}
        showYearDropdown
        showMonthDropdown
        dateFormat="dd/MM/yyyy"
        onClickOutside={() => false}
        // className="!h-9 !w-full !px-8 rounded-lg border border-stroke bg-transparent"
        selected={startDate}
        id='account-settings-date'
        portalId="datepicker-portal"
        popperClassName="!z-100000 date-picker-pop"
        yearDropdownItemNumber={5}
        onChange={onChangeDate}
        customInput={<CustomInput />}
      />
    </Box>
  )
}

export default CustomDatePicker