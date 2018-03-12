const newTodo = {
  content: 'I need to do things!',
  space_id: 7,
  completed: false,
}

const deleteTodo = {
  id: 1,
  // content must be falsy or not exist
  content: '',
}

const updateTodo = {
  id: 1,
  content: 'updated!',
  // optional
  completed: true,
}

const newSpace = {
  amenities: [{text: 'thing'}, {text: 'otherThings..'}],
  capacity: 4,
  city: 'New Orleans',
  cost: 23454.40,
  description: 'this is my description',
  main_image: {name: 'a;lksejf.png'},
  name: 'myspace',
  neighborhood: 'garden district',
  open: true,
  owner_fb_id: 'sadf9pwp8rypf98dsiyr9pfeouyfasfasd',
  purpose_id: 1,
  pet_id: 3,
  smoking_id: 2,
  state: 'LA',
  street_address: '748 camp st',
  timeline_id: 2,
  zip: 70115,
}

const updateSpace = {
  // lave id blank for creation, leave text blank for deletion
  amenities = [{ id: 1, text: "myThing" }, { text: "myThing" }, { id: 3 }],
  capacity: 4,
  city: 'New Orleans',
  cost: 23454.40,
  description: 'this is my description',
  gallery = [{ id: 1, name: 'fileNameOrUrl'}, {name: 'anotherFileNameOrUrl'}, {id: 1}],  location_display: 'address',
  main_image: {name: 'a;lksejf.png'},
  name: 'myspace',
  neighborhood: 'garden district',
  open: true,
  owner_fb_id: 'sadf9pwp8rypf98dsiyr9pfeouyfasfasd',
  pet_id: 3,
  purpose_id: 1,
  smoking_id: 2,
  street_address: '748 camp st',
  state: 'LA',
  timeline_id: 2,
  zip: 70115,
}


const newGroundrules = {spaceId: 2, ground_rules: 'do not break the house'};

const newUser = {
  about: 'i\'m me! and no one else. except for sometimes',
  image_url: 'https://i.chzbgr.com/full/9013910528/hAB49129F/',
  name_first: 'bobo',
  name_last: 'boberton',
  phone: 555555555555,
  email: 'email@email.email',
  fb_id: 'sadf9pwp8rypf98dsiyr9pfeouyfasfasd',
  fb_link: 'facebook.com',
  fb_verified: false,
  searchable_work: true,
  searchable_live: true,
  profession: 'programmer',
  birthdate: new Date(),
  gender_id: 2,
  sleep_id: 1,
  personality_id: 1,
};

const newSearch = {
  price_min: 500.00,
  price_max: 500.00,
  age_min: 20,
  age_max: 30,
  location_specificity: 'this is the specificity from geocoding',
  location_search: 'this is exactly what the user typed!',
  zip: '70118',
  city: 'New Orleans',
  state: 'la',
  include_people: true,
  fb_id: 'sadf9pwp8rypf98dsiyr9pfeouyfasfasd',
  personality_id: 2,
  sleep_id: 2,
  purpose_id: 1,
  timeline_id: 2,
  pet_id: 3,
  smoking_id: 3,
};

