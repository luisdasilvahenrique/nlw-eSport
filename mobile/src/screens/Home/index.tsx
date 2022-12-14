import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import LogoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../Components/Heading';
import { GameCard, GameCardProps } from '../../Components/GameCard';
import { Background } from '../../Components/Background';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}:GameCardProps){
    navigation.navigate(('game'), {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  },[])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image
        source={LogoImg}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu Duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={games}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GameCard
            data={item}
            onPress={() => handleOpenGame(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
  </Background>
  );
}