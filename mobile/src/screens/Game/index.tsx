import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import logoImg from '../../assets/logo-nlw-esports.png'
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { GameParams } from '../../@types/@navigation';

import { Text } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../../Components/Heading';
import { DuoCard, DuoCardProps } from '../../Components/DuoCard';
import { Background } from '../../Components/Background';
import { DuoMatch } from '../../Components/DuoMatch';

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function GetDiscordUser(adsId: string){
    fetch(`http://192.168.1.5:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.1.5:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  },[]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
                <Entypo 
                  name="chevron-thin-left"
                  color={THEME.COLORS.CAPTION_300}
                  size={20}
                  
                />
            </TouchableOpacity>
            <Image
              source={logoImg}
              style={styles.logo}
            />
            <View style={styles.right}/>
        </View>

        <Image
          source={{ uri:game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
        title={game.title} 
        subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
            data={item}
            onConnect={()=> GetDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.emptyListContent : styles.contentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda. 
            </Text>
          )}
        />
          
        <DuoMatch  
          onClose={() => setDiscordDuoSelected('')}
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
        /> 
        
      </SafeAreaView>
    </Background>
  );
}