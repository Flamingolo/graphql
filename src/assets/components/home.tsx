import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';
import { GET_ALL_DATA } from './graphql/query';
import StatCard from './statCard';
import Chart from './chart';
import Heading from './Heading';
import SkillsPieChart from './SkillsPieChart';
import convertToReadableUnit from './convert';
import '../css/home.css';

<<<<<<< HEAD
const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  console.log(data)
=======

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
>>>>>>> myrepo/main

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user[0];

  const personalInfoData = [
    { className: 'stat-card-dark-gray', title: 'Name', info: `${user.attrs.firstName} ${user.attrs.lastName}` },
    { className: 'stat-card-gray', title: 'Country', info: user.attrs.country },
    { className: 'stat-card-gray', title: 'Telephone', info: user.attrs.tel },
    { className: 'stat-card-gray', title: 'Date of birth', info: new Date(user.attrs.dateOfBirth).toLocaleDateString() },
    { className: 'stat-card-gray', title: 'Other languages', info: user.attrs.speaksOtherLanguages },
  ];

  const analyticsData = [
    { className: 'stat-card-blue', title: 'Total audit XP made', info: convertToReadableUnit(user.totalUp) },
    { className: 'stat-card-orange', title: 'Total audit XP given', info: convertToReadableUnit(user.totalDown) },
    { className: 'stat-card-green', title: 'Total transactions', info: user.transactions.length.toString() },
  ];

<<<<<<< HEAD
  // Filter out audit transactions
  const completedProjectsTransactions = user.transactions.filter(
    (transaction: any) => transaction.type !== 'up' && transaction.type !== 'down' // Exclude audit transactions
  );

  // Process top 3 earners from completed projects only
  const projectXpMap: { [key: string]: number } = completedProjectsTransactions.reduce((acc: { [key: string]: number }, transaction: any) => {
=======
  // Process top 3 earners
  const projectXpMap: { [key: string]: number } = user.transactions.reduce((acc: { [key: string]: number }, transaction: any) => {
>>>>>>> myrepo/main
    const projectName = transaction.object.name;
    if (!acc[projectName]) {
      acc[projectName] = 0;
    }
    acc[projectName] += transaction.amount;
    return acc;
  }, {});

  const topProjects = Object.entries(projectXpMap)
    .sort(([, xpA], [, xpB]) => xpB - xpA)
    .slice(0, 3)
<<<<<<< HEAD
    .map(([name, xp]) => ({ name, xp: xp }));

  console.log(projectXpMap)

  // Process transactions to create chart data and accumulate XP
  let cumulativeXp = 0;
=======
    .map(([name, xp]) => ({ name, xp: convertToReadableUnit(xp) }));

  // Process transactions to create chart data and accumulate XP
  let cumulativeXp = 0;
  let previousCumulativeXp = 0;
>>>>>>> myrepo/main
  const chartData = user.transactions
    .filter((transaction: any) => transaction.type === 'xp')
    .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map((transaction: any) => {
      cumulativeXp += transaction.amount;
<<<<<<< HEAD
      return {
        amount: cumulativeXp.toString(), // Use the cumulative value directly
        projectName: transaction.object.name,
        date: new Date(transaction.createdAt).toLocaleDateString(),
      };
    });
=======
      if (cumulativeXp !== previousCumulativeXp) {
        previousCumulativeXp = cumulativeXp;
        return {
          amount: convertToReadableUnit(cumulativeXp),
          projectName: transaction.object.name,
          date: new Date(transaction.createdAt).toLocaleDateString(),
        };
      }
      return null;
    })
    .filter((dataPoint: any) => dataPoint !== null);
>>>>>>> myrepo/main

  // Extract skills data
  const skills = user.transactions
    .filter((transaction: any) => transaction.object.attrs && transaction.object.attrs.language)
    .reduce((acc: any, transaction: any) => {
      const skillName = transaction.object.attrs.language;
      const amount = transaction.amount;
      const existingSkill = acc.find((skill: any) => skill.name === skillName);

      if (existingSkill) {
        existingSkill.value += amount;
      } else {
        acc.push({ name: skillName, value: amount });
      }

      return acc;
    }, [])
    .map((skill: any) => ({ ...skill, value: parseFloat((skill.value / 1e3).toFixed(2)) }));

  return (
    <Container className="home-container">
      <Row className="header">
        <Row className="header-top">
          <button className="header-top-button" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>
            Log out
          </button>
        </Row>
        <Row className="header-bottom">
          <Col className="header-bottom-left">
            <h1>Hi,</h1>
            <Heading text={user.login} />
          </Col>
          <Col className="header-bottom-right">
            <Chart data={chartData} />
          </Col>
        </Row>
      </Row>

      <Row className="info">
        <Col className="info-left">
          <h3>Personal info</h3>
          <div className="info-box">
            {personalInfoData.map((item, index) => (
              <StatCard key={index} className={item.className} title={item.title} info={item.info} />
            ))}
          </div>
        </Col>
        <Col className="info-right">
          <h3>Analytics</h3>
          <div className="analytics-box">
            {analyticsData.map((item, index) => (
              <StatCard key={index} className={item.className} title={item.title} info={item.info} />
            ))}
          </div>
          <div className="top-projects-container">
            {topProjects.map((project, index) => (
              <StatCard key={index} className={`stat-card stat-card-top-${index + 1}`} title={`Top Project ${index + 1}`} info={`${project.name}: ${project.xp}`} />
            ))}
          </div>
          <div className="skills-box">
            <h3>Skills</h3>
            <SkillsPieChart skills={skills} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
