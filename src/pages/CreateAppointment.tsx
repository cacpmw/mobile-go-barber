import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';
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
  Schedule,
  Title,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  ScrollViewContent,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from '../styles/pages/createAppointment';

interface RouteParams {
  providerId: string;
}

interface ProviderAvailability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const [providerAvailability, setProviderAvailability] = useState<
    ProviderAvailability[]
  >([]);
  const [providers, setProviders] = useState<IProviderObject[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user } = useAuthenticationContext();
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );
  const morningAvailability = useMemo(() => {
    return providerAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [providerAvailability]);

  const afternoonAvailability = useMemo(() => {
    return providerAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          formattedHour: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [providerAvailability]);

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
      .get(`/providers/${selectedProvider}/day-availability`, {
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

  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);
      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });
      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Oos! Something went wrong',
        "We couldn't process your request",
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Providers</HeaderTitle>
        <UserAvatar source={{ uri: user.avatarUrl }} />
      </Header>
      <ScrollViewContent>
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
        <Schedule>
          <Title>Choose the time</Title>
          <Section>
            <SectionTitle>Morning</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ available, hour, formattedHour }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={formattedHour}
                  onPress={() => {
                    handleSelectedHour(hour);
                  }}
                >
                  <HourText selected={selectedHour === hour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Afternoon</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ available, hour, formattedHour }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={formattedHour}
                    onPress={() => {
                      handleSelectedHour(hour);
                    }}
                  >
                    <HourText selected={selectedHour === hour}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>
        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Schedule</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </ScrollViewContent>
    </Container>
  );
};

export default CreateAppointment;
