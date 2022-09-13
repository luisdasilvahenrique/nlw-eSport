import { View, Image } from 'react-native';
import { styles } from './styles';

import LogoImg from '../../assets/logo-nlw-esports.png';
import { Headeing } from '../../Components/Heading';
import { GameCard } from '../../Components/GameCard';

import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={LogoImg}
        style={styles.logo}
      />

      <Headeing
        title="Encontre seu Duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <GameCard
        data={GAMES[0]}
      />
    </View>
  );
}