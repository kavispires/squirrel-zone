import React from 'react';

// Components
import GroupDistributionSnippet from './GroupDistributionSnippet';

function GroupOverallDistributionSnippet({ distributions, members }) {
  const overallTotal = distributions.length * 100;

  const overallDistribution = distributions.reduce(
    (acc, dist) => {
      Object.keys(members).forEach((memberKey) => {
        if (acc.stats[memberKey] === undefined) {
          acc.stats[memberKey] = {
            absoluteProgress: 0,
            overallTotal: 0,
          };
        }
        acc.stats[memberKey].overallTotal += dist?.stats[memberKey]?.absoluteProgress ?? 0;

        acc.stats[memberKey].absoluteProgress = Math.round(
          (acc.stats[memberKey].overallTotal * 100) / overallTotal
        );
      });
      return acc;
    },
    {
      id: 'overall',
      stats: {},
    }
  );

  return (
    <div className="group-distribution-overall">
      <span className="group-distribution-overall__title">Overall</span>
      <GroupDistributionSnippet
        distribution={overallDistribution}
        members={members}
        className="group-distribution-overall__snippet"
      />
    </div>
  );
}

export default GroupOverallDistributionSnippet;
