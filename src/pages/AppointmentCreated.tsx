/* eslint-disable import/no-duplicates */
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from '../styles/pages/appointmentCreated';

interface RouteParams {
  date: number;
}
const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();
  const routeParams = params as RouteParams;
  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd ' de ' MMMM ' de ' yyyy ' as ' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);
  const handleOkButton = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);
  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Appointment successfully scheduled!</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkButton}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
