const locations = ['Cincinnati', 'South Carolina','Minnesota','Michigan','Cincinnati Northland']


function locations() {
    locationsArray = [];
    locations.forEach(locations => {
        let location = new locationSelector(location, 'locations', radio, `location-label--${location}`)
        locationsArray.push(location.render())
    })
    return locationsArray;
}