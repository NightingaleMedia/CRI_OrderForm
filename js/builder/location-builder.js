const locations = ['Cincinnati', 'South Carolina','Minnesota','Michigan','Cincinnati Northland', 'Not Sure']


function locations() {
    locationsArray = [];
    locations.forEach(location => {
        let location = new locationSelector(location, 'locations', radio, `location-label--${location}`)
        locationsArray.push(location.render())
    })
    return locationsArray;
}