import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactElement, ReactNode } from "react";

const Combobox = (props: {
  id?: string;
  title: string | any;
  value: string;
  helperText?: string;
  list: Array<{ key: string; value: any }>;
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}): ReactElement => {
  const { id, title, value, helperText, list = [], onChange } = props;
  return (
    <FormControl
      variant="standard"
      size="small"
      sx={{ minWidth: { xs: 80, md: 150 }, mr: 1 }}
    >
      <InputLabel id={id + "-label"}>{title}</InputLabel>
      <Select
        labelId={id + "-label"}
        data-testid={id}
        value={value}
        label={title}
        onChange={onChange}
        autoWidth
      >
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.key || item.value}
          </MenuItem>
        ))}
      </Select>
      {<FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Combobox;
