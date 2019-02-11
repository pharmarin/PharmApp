import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  Card,
  Icon,
  ListItem,
  Text,
} from 'react-native-elements';

import HtmlText from '../components/HtmlText';
import TermList from '../components/TermList';
import UtilisationCard from '../components/UtilisationCard';
import Alert from '../components/Alert';
import Table from '../components/Table';

const utilisations = [
  {
    slug: "ambiance",
    name: "Ambiance olphactive"
  },
  {
    slug: "diffusion",
    name: "Diffusion atmosphérique"
  },
  {
    slug: "application",
    name: "Application cutanée"
  },
  {
    slug: "orale",
    name: "Prise orale"
  },
  {
    slug: "inhalation_seche",
    name: "Inhalation sèche"
  },
  {
    slug: "inhalation_humide",
    name: "Inhalation humide"
  },
  {
    slug: "sauna_facial",
    name: "Sauna facial"
  }
]

export default class PlanteDetail extends React.Component {

  switchStatus (status) {
    switch (status) {
      case "0":
        return "secondary"
        break;
      case "1":
        return "warning"
        break;
      case "2":
        return "danger"
        break;
      default:
        return null;
    }
  }

  render () {
    let post = this.props.post
    return (
      <View style={styles.container}>
        {
          post.terms["famille"].length > 0 || post.terms["drogues_vegetales"].length > 0 || post.terms["principes_actifs"].length > 0 || post.terms["origines_geographiques"].length > 0 ?
          <View style={styles.block}>
            <Text style={styles.h1}>Identité</Text>
            <Card
              containerStyle={styles.identiteCardContainer}
              >
              {
                post.terms["famille"].length > 0 ?
                <ListItem
                  title={ <Text>Famille des <TermList post={post} term='famille' /></Text> }
                  leftIcon={ <Icon type="font-awesome" name="folder-open-o" iconStyle={styles.icon} /> }
                  bottomDivider={true}
                  />
                : null
              }
              {
                post.terms["drogues_vegetales"].length > 0 ?
                <ListItem
                  title={ <Text> Organe(s) distillé(s) : <TermList post={post} term='drogues_vegetales' /></Text> }
                  leftIcon={ <Icon type="font-awesome" name="pagelines" iconStyle={styles.icon} /> }
                  bottomDivider={true}
                  />
                : null
              }
              {
                post.terms["principes_actifs"].length > 0 ?
                <ListItem
                  title={ <Text> Molécule(s) principale(s) : <TermList post={post} term='principes_actifs' /></Text> }
                  leftIcon={ <Icon type="font-awesome" name="gear" iconStyle={styles.icon} /> }
                  bottomDivider={true}
                  />
                : null
              }
              {
                post.terms["origines_geographiques"].length > 0 ?
                <ListItem
                  title={ <Text> Origine(s) : <TermList post={post} term='origines_geographiques' /></Text> }
                  leftIcon={ <Icon type="font-awesome" name="globe" iconStyle={styles.icon} /> }
                  />
                : null
              }
            </Card>
          </View>
          : null
        }
        {
          post.terms["proprietes"].length > 0 ?
          <View style={styles.block}>
            <Text style={styles.h1}>Propriétés principales</Text>
            <TermList post={post} term='proprietes' />
          </View>
          : null
        }
        {
          post.terms["usages"].length > 0 ?
          <View style={styles.block}>
            <Text style={styles.h1}>Utilisation traditionnelle</Text>
            <TermList post={post} term='usages' />
          </View>
          : null
        }
        {
          post.blocks.hasOwnProperty("lazyblock/utilisation-he") ?
          <View style={styles.block}>
            <Text style={styles.h1}>Modes d'utilisation</Text>
            {
              utilisations.map(function (utilisation, index) {
                return <UtilisationCard
                  key={index}
                  index={index}
                  name={utilisation.name}
                  recos={post.blocks["lazyblock/utilisation-he"].attrs[utilisation.slug + "_recos"]}
                  comment={post.blocks["lazyblock/utilisation-he"].attrs[utilisation.slug + "_commentaire"]}
                  />
              })
            }
          </View>
          : null
        }
        {
          post.blocks.hasOwnProperty("lazyblock/precautions") ?
          <View style={styles.block}>
            <Text style={styles.h1}>Précautions d'emploi</Text>
            {
              post.blocks["lazyblock/precautions"].attrs.precaution.map((precaution, index) =>
                <Alert key={"precaution_" + index} style={this.switchStatus(precaution.precaution_status)}>{
                    precaution.precaution_commentaire
                  }</Alert>
              )
            }
          </View>
          : null
        }
        {
          post.blocks.hasOwnProperty("lazyblock/conseils") || post.blocks.hasOwnProperty("lazyblock/formules-he") ?
          <View style={styles.block}>
            <Text style={styles.h1}>Conseils et idées de formulation</Text>
            {
              post.blocks.hasOwnProperty("lazyblock/conseils") ?
                post.blocks["lazyblock/conseils"].map((conseil, index) =>
                  <Card
                    key={"conseil_" + index}
                    title={
                      conseil.attrs.titre ?
                      <Text style={[styles.h3, styles.conseilTitle]}>{ conseil.attrs.titre }</Text>
                      : null
                    }
                    containerStyle={
                      index === 0 ? [styles.conseilCardContainer, { marginTop: 0 }]
                      : styles.conseilCardContainer
                    }
                    >
                    <View>
                      <HtmlText>{ conseil.attrs.conseil }</HtmlText>
                    </View>
                  </Card>
                )
              : null
            }
            {
              post.blocks.hasOwnProperty("lazyblock/formules-he") ?
                post.blocks["lazyblock/formules-he"].map((formule, index) =>
                  <Card
                    key={"formule_" + index}
                    title={
                      formule.attrs.titre ?
                      <Text style={[styles.h3, styles.conseilTitle]}>{ formule.attrs.titre }</Text>
                      : null
                    }
                    containerStyle={
                      index === 0 ? [styles.conseilCardContainer, { marginTop: 0 }]
                      : styles.conseilCardContainer
                    }
                    >
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <View style={{flex: 1}}>
                        <Table data={ formule.attrs.ingredients } />
                      </View>
                      <View style={{flex: 1}}>
                        <HtmlText style={{flex: 1}}>{ formule.attrs.instructions }</HtmlText>
                      </View>
                    </View>
                  </Card>
                )
              : null
            }
          </View>
          : null
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },

  identiteCardContainer: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 0,
    padding: 0,
  },
  conseilCardContainer: {
    flex: 1,
    marginHorizontal: 0,
  },
  block: {
    marginBottom: 10,
  },
  icon: {
    fontSize: 13,
  },
});
