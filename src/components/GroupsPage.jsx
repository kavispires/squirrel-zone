import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Card, Image } from 'antd';
// Store
import store from '../services/store';
// Utilities
import { IMAGE_URL } from '../utils/constants';
import { dasherize } from '../utils';
// Components
import LoadingContainer from './global/LoadingContainer';

function Groups() {
  const history = useHistory();
  const [groups, setGroups] = useState([]);

  // Fetch Groups
  useEffect(() => {
    async function loadContent() {
      setGroups(await store.getCollection('groups'));
    }
    loadContent();
  }, []);

  const goToGroupPage = useCallback(
    (e, group, subRoute) => {
      e.stopPropagation();
      history.push(subRoute ? `/groups/${group.id}/${subRoute}` : `/groups/${group.id}`);
    },
    [history]
  );

  return (
    <Layout.Content className="container">
      <main className="main groups">
        <h1>Groups</h1>
        <LoadingContainer waitFor="group" noResults={!groups.length}>
          <ul className="groups-cards">
            {groups.map((group) => {
              return (
                <li className="groups-cards__card" key={group.id}>
                  <Card
                    style={{ flexGrow: 1, maxWidth: '400px' }}
                    hoverable
                    cover={
                      <Image
                        alt={group.name}
                        src={`${IMAGE_URL.GROUP}${dasherize(group.name)}`}
                        fallback={`${IMAGE_URL.GROUP}no-group-photo.jpg`}
                      />
                    }
                    actions={groupCardActions(group, goToGroupPage)}
                    className="group-card"
                    onClick={(e) => goToGroupPage(e, group)}
                  >
                    <Card.Meta
                      title={group.name}
                      description={`${group.debutYear} — ${group.disbandmentYear}`}
                    />
                  </Card>
                </li>
              );
            })}
          </ul>
        </LoadingContainer>
      </main>
    </Layout.Content>
  );
}

function groupCardActions(group, goToGroupPage) {
  return [
    <span className="group-card__action" onClick={(e) => goToGroupPage(e, group, 'members')}>
      Members
    </span>,
    <span className="group-card__action" onClick={(e) => goToGroupPage(e, group, 'distributions')}>
      Distributions
    </span>,
  ];
}

export default Groups;
