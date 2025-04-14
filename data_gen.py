import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Base data
regions = {
    "Marrakesh": {"lat": 31.6295, "lng": -7.9811},
    "Agadir": {"lat": 30.4278, "lng": -9.5981},
    "Essaouira": {"lat": 31.5085, "lng": -9.7595},
    "Safi": {"lat": 32.2994, "lng": -9.2372}
}

neighborhoods = {
    "Marrakesh": ["Medina", "Gueliz", "Hivernage", "Palmeraie", "Mellah"],
    "Agadir": ["Marina Bay", "City Center", "Founty", "Sonaba", "Talborjt"],
    "Essaouira": ["Medina", "Beach", "Port", "Mellah", "Borj"],
    "Safi": ["Medina", "Port Area", "Nouvelle Ville", "Chaâba", "Beach District"]
}

lifestyles = ["food_lover", "explorer", "comfort_seeker"]

# More varied activity types with realistic pricing and duration
activity_data = {
    "food_lover": [
        {"name": "street food tour", "base_cost": (150, 300), "base_duration": (2, 3), "type": "food", "difficulty": "easy"},
        {"name": "cooking class", "base_cost": (400, 650), "base_duration": (2.5, 4), "type": "food", "difficulty": "moderate"},
        {"name": "local café crawl", "base_cost": (100, 250), "base_duration": (1.5, 2.5), "type": "food", "difficulty": "easy"},
        {"name": "food market exploration", "base_cost": (100, 200), "base_duration": (1, 2), "type": "food", "difficulty": "easy"},
        {"name": "fine dining experience", "base_cost": (500, 800), "base_duration": (2, 3), "type": "food", "difficulty": "easy"},
        {"name": "traditional dinner show", "base_cost": (350, 600), "base_duration": (3, 4), "type": "food", "difficulty": "easy"}
    ],
    "explorer": [
        {"name": "museum visit", "base_cost": (100, 300), "base_duration": (1.5, 3), "type": "culture", "difficulty": "easy"},
        {"name": "guided city walk", "base_cost": (150, 350), "base_duration": (2, 3.5), "type": "culture", "difficulty": "moderate"},
        {"name": "cultural monument tour", "base_cost": (100, 250), "base_duration": (1, 2), "type": "culture", "difficulty": "easy"},
        {"name": "historic site exploration", "base_cost": (150, 400), "base_duration": (2, 4), "type": "culture", "difficulty": "moderate"},
        {"name": "artisan workshop visit", "base_cost": (200, 450), "base_duration": (1.5, 3), "type": "culture", "difficulty": "easy"},
        {"name": "mountain excursion", "base_cost": (350, 700), "base_duration": (4, 8), "type": "nature", "difficulty": "hard"}
    ],
    "comfort_seeker": [
        {"name": "spa treatment", "base_cost": (400, 800), "base_duration": (1.5, 3), "type": "relaxation", "difficulty": "easy"},
        {"name": "traditional hammam", "base_cost": (300, 600), "base_duration": (1, 2), "type": "relaxation", "difficulty": "easy"},
        {"name": "beach lounging", "base_cost": (100, 200), "base_duration": (2, 5), "type": "nature", "difficulty": "easy"},
        {"name": "resort day pass", "base_cost": (400, 750), "base_duration": (4, 8), "type": "relaxation", "difficulty": "easy"},
        {"name": "sunset yacht cruise", "base_cost": (500, 900), "base_duration": (2, 3), "type": "nature", "difficulty": "easy"},
        {"name": "garden tour & tea", "base_cost": (200, 400), "base_duration": (1.5, 3), "type": "relaxation", "difficulty": "easy"}
    ]
}

# Activity name templates for more variety
name_templates = [
    "{activity} in {neighborhood}, {region}",
    "{region}'s Best {activity}",
    "Authentic {activity} Experience in {region}",
    "{activity} Adventure - {neighborhood}",
    "Traditional {activity} - {region}",
    "Exclusive {activity} in {region}",
    "{region} {activity} Discovery",
    "{neighborhood} {activity}",
    "Unforgettable {activity} in {region}"
]

# Time of day options with realistic constraints
time_of_day_options = {
    "food": ["morning", "afternoon", "evening"],
    "culture": ["morning", "afternoon"],
    "relaxation": ["morning", "afternoon", "evening"],
    "nature": ["morning", "afternoon"]
}

# Seasonal availability
seasonal_options = ["year_round", "summer_only", "winter_only", "spring_fall"]
seasonal_weights = [0.7, 0.1, 0.1, 0.1]  # 70% year-round, 10% each seasonal option

def generate_realistic_rating():
    """Generate a rating weighted toward positive experiences (3.5-5.0)"""
    return round(random.uniform(3.0, 5.0) * 2) / 2  # Half-point ratings

def generate_position_near(base_lat, base_lng, max_distance_km=5):
    """Generate a position within a few km of the base coordinates"""
    # 0.01 degree is roughly 1km
    lat_variation = random.uniform(-max_distance_km * 0.009, max_distance_km * 0.009)
    lng_variation = random.uniform(-max_distance_km * 0.009, max_distance_km * 0.009)
    return base_lat + lat_variation, base_lng + lng_variation

def generate_activity():
    """Generate a single activity with all attributes"""
    region = random.choice(list(regions.keys()))
    neighborhood = random.choice(neighborhoods[region])
    lifestyle = random.choice(lifestyles)

    # Select activity type
    activity_type = random.choice(activity_data[lifestyle])

    # Generate cost based on activity type (with some randomness)
    min_cost, max_cost = activity_type["base_cost"]
    cost = random.randint(min_cost, max_cost)

    # Generate duration based on activity type (with some randomness)
    min_dur, max_dur = activity_type["base_duration"]
    duration = round(random.uniform(min_dur, max_dur), 1)

    # Determine time of day options
    time_options = time_of_day_options[activity_type["type"]]
    time_of_day = random.choice(time_options)

    # Set the name with variety
    activity_name = random.choice(name_templates).format(
        activity=activity_type["name"].title(),
        region=region,
        neighborhood=neighborhood
    )

    # Generate coordinates near the region's center
    lat, lng = generate_position_near(regions[region]["lat"], regions[region]["lng"])

    # Generate seasonal availability
    seasonal = np.random.choice(seasonal_options, p=seasonal_weights)

    # Generate a description
    descriptions = [
        f"Experience the authentic flavors and culture of {region} with this {activity_type['name']}.",
        f"Discover the best of {region} during this unforgettable {activity_type['name']}.",
        f"Immerse yourself in the local {neighborhood} area with this {activity_type['type']} experience.",
        f"A must-do {activity_type['name']} for visitors to {region}.",
        f"Explore the hidden gems of {neighborhood} with this guided {activity_type['name']}."
    ]
    description = random.choice(descriptions)

    return {
        "activity_name": activity_name,
        "region": region,
        "neighborhood": neighborhood,
        "lifestyle": lifestyle,
        "cost_mad": cost,
        "duration_hrs": duration,
        "type": activity_type["type"],
        "difficulty": activity_type["difficulty"],
        "rating": generate_realistic_rating(),
        "time_of_day": time_of_day,
        "seasonal_availability": seasonal,
        "latitude": round(lat, 6),
        "longitude": round(lng, 6),
        "description": description
    }

# Generate activities with balanced distribution
rows = []
id_counter = 1

# Ensure equal distribution across regions
target_per_region = 300 // len(regions)

region_counts = {region: 0 for region in regions}

while len(rows) < 300:
    # Get region with lowest count
    min_region = min(region_counts, key=region_counts.get)

    # Generate activity for that region
    activity = generate_activity()
    if activity["region"] == min_region or all(count >= target_per_region for count in region_counts.values()):
        activity["id"] = id_counter
        id_counter += 1
        rows.append(activity)
        region_counts[activity["region"]] += 1

# Create DataFrame and save
df = pd.DataFrame(rows)
df.to_csv("activities.csv", index=False)
print(f"✅ File 'activities.csv' generated with {len(df)} activities.")
print(f"Region distribution: {', '.join([f'{r}: {c}' for r, c in region_counts.items()])}")