export interface ItineraryResponse {
  ISO_3166_A3_COUNTRY_CODE: string
  budget: string;
  destination: string;
  itinerary: Itinerary;
  local_currency: string;
  local_currency_symbol: string;
  preferred_travel_style: string;
  recommended_accommodations: Recommendations[];
  recommended_restaurants: Recommendations[];
  travel_period: string;
  budget_for_all_days: BudgetForAllDays;
  types_and_observations: string[]
}

export interface BudgetForAllDays {
  activities_average_cost: string;
  food_average_cost: string;
  hosting_average_cost: string;
  total_average_cost: string;
  transportation_average_cost: string;
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
  description: string;
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  time: string;
}

export interface Recommendations {
  description: string;
  address: string;
  average_cost: string;
  latitude: string;
  longitude: string;
  name: string;
  type: string;
}
