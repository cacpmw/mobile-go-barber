import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IProviderObject from '../../interfaces/objects/IProviderObject';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}
export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin-left: 16px;
`;
export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const BackButton = styled.TouchableOpacity``;
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

// eslint-disable-next-line prettier/prettier
export const ProvidersList = styled(FlatList as new () => FlatList<IProviderObject>)`
  padding: 32px 24px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  align-items: center;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const CalendarTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;
export const OpenDatePickerText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;