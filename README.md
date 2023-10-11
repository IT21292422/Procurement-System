## When you clone the project first run following commands and create some file

### Move to folder
```
cd f [press tab key]
```

### Install npm
```
npm i
```

### If something goes wrong 
```
npm upgrade
```
or
```
npx expo start -c
```

### create file name ***.env.local*** in root folder, include the firebase config
```
  EXPO_PUBLIC_API_KEY = 
  EXPO_PUBLIC_AUTH_DOMAIN = 
  EXPO_PUBLIC_PROJECT_ID = 
  EXPO_PUBLIC_STORAGE_BUCKET = 
  EXPO_PUBLIC_MESSAGING_SENDER_ID = 
  EXPO_PUBLIC_APP_ID = 
```

* If it doesn't work add "" between values
---
### redux common files

import files
```
import { View, Text,Button } from 'react-native'
import { setUserType,logOut,logUser,setLoading } from '../../features/user/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { UserState } from '../../config/interfaces';
```
use and change values
```
const dispatch = useDispatch()

let userName: string | null = useSelector((state: { user: UserState }) => state.user.userName);

let userType: string | null = useSelector((state: { user: UserState }) => state.user.userType);

let isLoading: boolean = useSelector((state: { user: UserState }) => state.user.isLoading);

      <Text>User name {userName}</Text>
      <Text>User type {userType}</Text>

      <Button title='change to manager' onPress={() => dispatch(setUserType('manager'))}/>

      <Button title='change to site_manager' onPress={() => dispatch(setUserType('site_manager'))}/>

      <Button title='change to procurement_staff' onPress={() => dispatch(setUserType('procurement_staff'))}/>

      <Button title='change to supplier' onPress={() => dispatch(setUserType('supplier'))}/>
```

