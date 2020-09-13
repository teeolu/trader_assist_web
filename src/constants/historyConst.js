import { colors } from '../Css';
import {
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  EditFilled,
  DeleteOutlined,
  CheckOutlined,
  MailOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

export const historyTag = {
  edit: {
    icon: EditFilled,
    color: colors.yellow,
  },
  add: {
    icon: UserAddOutlined,
    color: colors.blue,
  },
  invest: {
    icon: VerticalAlignBottomOutlined,
    color: colors.green,
    size: 25,
  },
  return: {
    icon: VerticalAlignTopOutlined,
    color: colors.red,
    size: 25,
  },
  delete: {
    icon: DeleteOutlined,
    color: colors.pinkDark,
  },
  approve: {
    icon: CheckOutlined,
    color: colors.green,
  },
  invite: {
    icon: MailOutlined,
    color: '#a06a34',
  },
};
