import React, { Component } from 'react'
import './Channels.scss'
import {
  Item, Button, Icon, Loader,
} from 'semantic-ui-react'
import ChannelModalCreate from './ChannelModalCreate'
import ChannelModalRemove from './ChannelModalRemove'
// import ChannelModalEdit from './ChannelModalEdit';

class Channels extends Component {
  constructor() {
    super()
    this.state = {
      channels: [],
      // edittingChannel: {},
      removingChannel: {},
      showModalRemove: false,
      // showModalEdit: false,
      showModalCreate: false,
      loader: true,
    }
  }

  async componentDidMount() {
    await this.getToken()
    this.getChannels()
  }

  getToken = async () => {
    await fetch(`${process.env.REACT_APP_EXPRESS_HOST}/api/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ email: `${process.env.REACT_APP_MAINFLUX_USER}` }),
    })
  }

  getChannels = async () => {
    await fetch(`${process.env.REACT_APP_EXPRESS_HOST}/api/channels`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((channels) => this.setState({ channels, loader: false }))
      .catch((err) => err)
  }

  removeModalCallback = (showModalRemove, removeItemId) => {
    this.setState({ showModalRemove })
    if (removeItemId) {
      this.setState((prevState) => ({
        channels: prevState.channels.filter((item) => item.id !== removeItemId),
      }))
    }
  }

  // editModalCallback = showModalEdit => {
  //   this.setState({ showModalEdit });
  // };

  createChannelModalCallback = async (showModalCreate) => {
    this.setState({ showModalCreate })
    await this.getChannels()
  }

  render() {
    const {
      channels,
      // showModalEdit,
      showModalCreate,
      showModalRemove,
      removingChannel,
      // edittingChannel,
      loader,
    } = this.state

    return (
      <div id="channels" className="main_wrapper">
        <div className="channel_top">
          <h1>Channels</h1>
          <Button
            icon
            labelPosition="left"
            onClick={() => this.setState({ showModalCreate: true })}
          >
            <Icon name="podcast" />
            Create Channel
          </Button>
        </div>
        <hr />
        <Item.Group relaxed>
          {<Loader active={loader} content="Loading" />}
          {channels.length === 0 ? (
            <p>
              Unfortunately we did not find your channels.
              <span role="img" aria-label="Sad">
                🙁
              </span>
            </p>
          ) : (
            channels.map((item) => (
              <Item key={item.id}>
                <Item.Content verticalAlign="middle">
                  <Item.Header>{item.name}</Item.Header>
                  <Item.Description>{item.id}</Item.Description>
                  <Item.Extra>
                    <Button
                      color="red"
                      floated="right"
                      icon="trash alternate outline"
                      labelPosition="right"
                      content="Remove"
                      onClick={() => this.setState({
                        showModalRemove: true,
                        removingChannel: item,
                      })}
                    />
                    {/* <Button
                      color="yellow"
                      floated='right'
                      icon='edit outline'
                      labelPosition='right'
                      content="Edit"
                      onClick={() => this.setState({ showModalEdit: true, edittingChannel: item })}
                    /> */}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))
          )}
        </Item.Group>

        {showModalRemove ? (
          <ChannelModalRemove
            showModalRemove={showModalRemove}
            channel={removingChannel}
            callbackFromParent={this.removeModalCallback}
          />
        ) : null}

        {/* {
          showModalEdit
          ? <ChannelModalEdit
              showModalEdit={showModalEdit}
              channel={edittingChannel}
              callbackFromParent={this.editModalCallback}
            />
          : null
        } */}

        {showModalCreate ? (
          <ChannelModalCreate
            showModalCreate={showModalCreate}
            callbackFromParent={this.createChannelModalCallback}
          />
        ) : null}
      </div>
    )
  }
}

export default Channels
