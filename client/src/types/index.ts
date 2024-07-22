export interface ItineraryResponse {
  budget: string;
  destination: string;
  extra_activities_based_on_preffered_travel_styles: ExtraActivitiesBasedOnPrefferedTravelStyle[];
  itinerary: Itinerary;
  local_currency: string;
  local_currency_symbol: string;
  preferred_travel_style: string[];
  recommended_accommodations: RecommendedAccommodation[];
  recommended_restaurants: RecommendedRestaurant[];
  travel_period: string;
}

export interface ExtraActivitiesBasedOnPrefferedTravelStyle {
  activity: string;
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  time: string;
}

export interface Itinerary {
  friday: ItineraryDay;
  monday: ItineraryDay;
  saturday: ItineraryDay;
  sunday: ItineraryDay;
  thursday: ItineraryDay;
  tuesday: ItineraryDay;
  wednesday: ItineraryDay;
}

export interface ItineraryDay {
  date_day: string;
  morning: ItineraryActivity;
  afternoon: ItineraryActivity;
  night: ItineraryActivity;
}

export interface ItineraryActivity {
  activity: string;
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  time: string;
}

export interface RecommendedAccommodation {
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  name: string;
  type: string;
}

export interface RecommendedRestaurant {
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  name: string;
  type: string;
}
