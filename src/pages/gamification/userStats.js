// import { Card, CardBody, CardHeader } from '@chakra-ui/card';
// import React, { useEffect, useState } from 'react';
// import { Text } from '@chakra-ui/layout';
// import { REWARD_DATA } from '../../data';

// const UserStats = () => {
//   const [earned, setEarned] = useState(0);
//   const [points, setPoints] = useState(0);

//   useEffect(() => {
//     REWARD_DATA.map(data => {
//       if (data.earned === true) {
//         console.log(data.points);
//         setEarned(earned + 1);
//         setPoints(points + data.points);
//       }
//     });
//   }, [setEarned, setPoints]);

//   return (
//     <Card w="100%">
//       <CardHeader fontSize="2xl" fontWeight="bold">
//         User statistics
//       </CardHeader>
//       <CardBody>
//         <Text>Total earned rewards: {earned}</Text>
//         <Text>Total earned points: {points}</Text>
//       </CardBody>
//     </Card>
//   );
// };

// export default UserStats;
