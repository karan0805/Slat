import { useListState, randomId } from '@mantine/hooks';
import { Checkbox } from '@mantine/core';

export default function Notification() {
  const initialValues = [
    { label: 'Receive email notifications', checked: false, key: randomId() },
    { label: 'Receive sms notifications', checked: false, key: randomId() },
    { label: 'Receive push notifications', checked: false, key: randomId() },
  ];
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      size="lg"
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, 'checked', event.currentTarget.checked)
      }
    />
  ));
  return (
    <div>
      <Checkbox
        size="lg"
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        transitionDuration={0}
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked })),
          )
        }
      />
      {items}
    </div>
  );
}
