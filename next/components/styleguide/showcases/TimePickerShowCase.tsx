import TimePicker from '../../forms/widget-components/DateTimePicker/TimePicker'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TimePickerShowCase = () => {
  return (
    <Wrapper direction="column" title="Time Picker">
      <Stack direction="column">
        <TimePicker label="Label" />
        <TimePicker label="Label" errorMessage={['Error message']} />
        <TimePicker label="Label" disabled />
      </Stack>
      <Stack direction="column">
        <TimePicker label="Label" required tooltip="Time Picker" helptext="Help text" />
        <TimePicker
          label="Label"
          errorMessage={['Error message']}
          required
          tooltip="Time Picker"
          helptext="Help text"
        />
        <TimePicker label="Label" disabled required tooltip="Time Picker" helptext="Help text" />
      </Stack>
    </Wrapper>
  )
}

export default TimePickerShowCase
