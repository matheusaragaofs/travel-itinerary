activity_template = """
    {
        "activity": "string",
        "description" :"string" 
        "address": "string",
        "latitude": "string",
        "longitude": "string",
        "time": "string",
        "average_cost": "string"
    }
"""

recomendation_template = """
    {
        "name": "string",
        "description" :"string"
        "address": "string",
        "latitude": "string",
        "longitude": "string",
        "average_cost": "string",
        "type": "string"
        
    }
"""


day_template = f"""
    {{
        "date_day": "string",
        "morning": [{activity_template}],
        "afternoon": [{activity_template}],
        "night": [{activity_template}]
    }}
"""

budget_template = f"""
{{
    hosting_average_cost: "string",
    food_average_cost: "string",
    transportation_average_cost: "string",
    activities_average_cost: "string",
    total_average_cost: "string"
}}
"""

expected_json_schema = f"""
{{
    ISO_3166_A3_COUNTRY_CODE: "string",
    "local_currency_symbol": "string",
    "local_currency": "string",
    "itinerary": [ {day_template}],
    "tips_and_observations": [ string ]
    "recommended_accommodations": [ {recomendation_template} ],
    "recommended_restaurants": [ {recomendation_template} ],
    "budget_for_all_days": {budget_template}
}}
"""
