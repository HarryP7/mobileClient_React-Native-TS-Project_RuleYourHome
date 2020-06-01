import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Switch, Text, Title, TouchableRipple, useTheme,
} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PreferencesContext } from './context/preferencesContext';
import { store } from '../store';
import { Role } from '../enum/Enums';
import { NoAvatar } from '../constants';

const { userLogin } = store.state;

type Props = DrawerContentComponentProps<DrawerNavigationProp>;

export function DrawerAdminContent(props: Props) {
  const paperTheme = useTheme();
  const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    PreferencesContext
  );

  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });
  var { myGroups, address, fk_Role, login, fullName, avatar, uid } = userLogin

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        //@ts-ignore
        style={[
          styles.drawerContent,
          {
            backgroundColor: paperTheme.colors.surface,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={{ marginBottom: -10 }}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <Avatar.Image source={{ uri: avatar ? avatar.url : NoAvatar, }} size={50} style={{backgroundColor:'white'}} />
          </TouchableOpacity>
          <Title style={styles.title}>{fullName}</Title>
          <Caption style={styles.caption}>@{login}</Caption>
          {/* <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
          </View> */}
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="account-edit" color={color} size={size} />
            )}
            label="Изменить профиль"
            labelStyle={{marginLeft: -20}}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('EditPROFILE', userLogin)
            }
          }
          />
          {(Role.admin == fk_Role || Role.moderator  == fk_Role) && 
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="home-plus" color={color} size={size} />
            )}
            label="Добавить дом"
            labelStyle={{marginLeft: -20}}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('AddHOME')
            }
          }
          />
        }
          {/* <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks"
            onPress={() => {}}
          /> */}
        </Drawer.Section>
        {/* <Drawer.Section title="Preferences">
          <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch              
                  value={theme === 'dark'} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={toggleRTL}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={rtl === 'right'} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section> */}
        <Drawer.Section>
          
        <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Выход"
            labelStyle={{marginLeft: -20}}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('EXITScreen')
            }
          }
          />
        {/* <TouchableRipple onPress={toggleTheme}>
            <View style={styles.preference}>
            <MaterialCommunityIcons name="logout" color={'grey'} size={25} />
              <Text>Выход</Text>
              <View pointerEvents="none">
              </View>
            </View>
          </TouchableRipple> */}
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});