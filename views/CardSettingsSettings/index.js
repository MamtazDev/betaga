import React, { useContext, useState } from 'react';

import { useCardStore } from '../../state/useCardStore';
import { Alert, Button, Div, H, L, Modal, P, T } from '../../../customized';
import { updateDocField } from '../../data/update/updateDocField';
import { UpdateAllPasses } from '../../operations/UpdateAllPasses'
import themeContext from '../../themes/theme';
import { localization } from '../../locales/localization';

export default function CardSettingsSettings() {
  const color = useContext(themeContext)
  const { cardState } = useCardStore();

  const cardId = cardState.id
  const cardActive = cardState.active

  const [Warning, setWarning] = useState(false);
  const [deactivated, setDeactivated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleWarning = () => {
    setWarning(true);
  };

  const onPressCancel = () => {
    setWarning(false);
  };
  
  const handleDeactivate = () => {
    setWarning(false);
    const value = cardActive ? false : true
    updateDocField('cards', cardId, 'active', value).then(()=>{
      setDeactivated(true)
    })
  };

  const handleUpdateAllPasses = () => {
    onPressCancel();
    setLoading(true);
    UpdateAllPasses(cardId)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Div s='f' color={color.background}>
        <Div s='m-20 jc p-40 br-40' color={color.light}>
          <H s='xl center uppercase'>{localization.en.Update_All_Cards}</H>
          <P> {localization.en.CardSettingOne}
           
          </P>
          <L s='center'>{localization.en.Why_not_all_cards_will_received_the_update}</L>
          <P>
          {localization.en.CardSettingTwo}
          </P>
          {loading ? (
            <H s='c'> {localization.en.CardSettingUpdateing}</H>
          ) : (
            <>
              <Button
                s='br-20'
                onPress={handleWarning}
                title={'Refresh and Update All Cards'}
                textColor={'white'}
                color={color.success}
              />
            </>
          )}
        </Div>
        {Warning && (
          <Alert
            onPressCancel={onPressCancel}
            onPressOk={handleUpdateAllPasses}
            title='Are you sure?'
            message='This cannot be un-done ! No backsies !!'
          />
        )}
        <Div s='m-20 jc p-40 br-40' color={color.light}>
          <H s='xl center'> {localization.en.Disable_Card}</H>
          <P s='rg'> {localization.en.to_disable_the_card}
           
          </P>
          <L s='center ts-17 mb-10'>  {localization.en.Warning}!!</L>
          <P s='rg'>  {localization.en.from_Apple_Wallet}</P>
          {deactivated ? (
            <H s='c'>Done</H>
          ) : (
            <Button
              s='br-20'
              onPress={handleDeactivate}
              title={cardActive ? 'Disable' : 'Activate'}
              textColor={'white'}
              color={color.error}
            />
          )}
        </Div>
      </Div>
    </>
  );
}
