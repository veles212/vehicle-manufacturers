import React from 'react';

import { useAppDispatch, useAppSelector, useNearBottom } from 'app/hooks';
import {
  getManufacturers,
  selectAllManufacturers,
  selectMakersStatus,
} from '../makersSlice';

import styles from './Manufacturers.module.scss';
import { useHistory } from 'react-router-dom';

export default function Manufacturers() {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const status = useAppSelector(selectMakersStatus);
  const makers = useAppSelector(selectAllManufacturers);

  useNearBottom(() => dispatch(getManufacturers()));

  return (
    <div className={styles.makers}>
      <h1>List of manufactures</h1>
      {status === 'loading' && 'Loading list of manufacturers...'}
      {status !== 'loading' && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Common name</th>
              <th>Country</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {makers.map(({ commonName, country, id }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{commonName}</td>
                <td>{country}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => history.push(`/manufacturer/${id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === 'adding' && 'Loading additional manufacturers...'}
    </div>
  );
}
