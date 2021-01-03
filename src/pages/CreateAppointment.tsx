import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { useAuthenticationContext } from '../context/AuthenticationContext';
import IProviderObject from '../interfaces/objects/IProviderObject';
import api from '../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
  BackButton,
  ProvidersList,
  ProvidersListContainer,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
} from '../styles/pages/createAppointment';

interface RouteParams {
  providerId: string;
}

interface ProviderAvailability {
  hour: number;
  avaialble: boolean;
}

const CreateAppointment: React.FC = () => {
  const [providerAvailability, setProviderAvailability] = useState<
    ProviderAvailability[]
  >([]);
  const [providers, setProviders] = useState<IProviderObject[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user } = useAuthenticationContext();
  const { goBack } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);
  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/dai-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setProviderAvailability(response.data);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectedProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Providers</HeaderTitle>
        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={provider => provider.id}
          data={providers}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => {
                handleSelectedProvider(provider.id);
              }}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatarUrl }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <CalendarTitle>Choose a date</CalendarTitle>
        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerText>Select</OpenDatePickerText>
        </OpenDatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            onChange={handleDateChange}
            display="spinner"
            mode="date"
            textColor="#f4ede8"
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
