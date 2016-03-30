import time
import json

stop_times = open("google_transit/stop_times.txt", "r+")
stops_info = open("google_transit/stops.txt", "r+")

# Create stops
stops = {}
for line in stops_info:
  # print line
  data = line.split(",")
  id = data[0]
  name = data[2]
  lat = data[4]
  lon = data[5]
  stop = {'name' : name, 'lat': lat, 'lon': lon}
  stops[id] = stop

# Create arrivals
foo = []
ids = []
arrivals = {}

def addArrival(id, day, hour, minute, second):
  if hour >= 24:
    day += 1
    hour -= 24
  if day == 8:
    day = 1
  arrivals.setdefault(id, []).append(int('{day:01d}{hour:02d}{minute:02d}{second:02d}'.format(
    day=day,
    hour=hour,
    minute=minute,
    second=second
  )))

iter_stop_times= iter(stop_times)
next(iter_stop_times)
for line in iter_stop_times:

  data = line.split(",")
  trip, car, train = data[0].split('_')
  train = train.split('.')[0]
  id = data[3]
  hour,minute,second = [int(x) for x in data[1].split(':')]

  if id.find('F23N') < 0 or train is not 'F':
    continue

  if id not in ids:
    ids.append(id)


  if trip.find('SAT') >= 0:
    day = 7
    addArrival(id, day, hour, minute, second)
  elif trip.find('SUN') >= 0:
    day = 1
    addArrival(id, day, hour, minute, second)
  else:
    for day in range(2,7):
      addArrival(id, day, hour, minute, second)

  # if hour >= 24:
  #   print(day, hour, minute)
  #   if day == 3:
  #     day = 1
  #   else:
  #     day += 1
  #   hour -= 24






data = {}
for id in ids:
  data[id] = {
    'name': stops[id]['name'],
    'lat': stops[id]['lat'],
    'lon': stops[id]['lon'],
    'arrivals': sorted(arrivals[id])
  }

print data['F23N']['arrivals']

with open('schedule.json', 'w') as outfile:
  json.dump(data, outfile)
