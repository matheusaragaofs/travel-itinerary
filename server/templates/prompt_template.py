from langchain.prompts import PromptTemplate

prompt_template = PromptTemplate(
    input_variables=[
        "destination",
        "travel_period",
        "preffered_travel_styles",
        "budget",
        "expected_json_schema",
    ],
    template=(
        """
        You will be a travel expert, your role is to create travel itineraries based on some information that will be provided below
        Choose the most popular and famous activities in that location
        Please create a detailed travel itinerary with the following information:

        The destination of interest is: {destination};
        The travel budget trip is: {budget};
        
        Generate a travel plan in the following JSON format: {expected_json_schema}

        Based on the preffered travel styles: {preffered_travel_styles};
        Make the itinerary for the period of {travel_period};
        Make sure the answer is in brazilian portuguese;
        Make sure to include types and observations about the destination in the "types_and_observations", maybe about the weather, the culture, the people, etc;
        Make sure to include a brief description of the destination and the types of activities that can be done there in the itinerary days;
        Make sure there are 3 accommodation recommendations in: "recommended_accommodations" and a brief description about the accommodation;
        Make sure there are 3 restaurants recommendations in: "recommended_restaurants and a brief description about the restaurant;
        Make sure activities at close times are relatively close together;
        Make sure to include the average cost of hosting, food, transportation, activities, and the total average cost in the "budget_for_all_days";
        Make sure to fill in all required fields with appropriate data.
        Make sure if the address has "R. " in it, it is replaced with "Rua " and if it has "Av. " in it, it is replaced with "Avenida ", and it doesnt need
        the zipcode in the address and the format should be "street_name, number, neighborhood, city - state".
    """
    ),
)
