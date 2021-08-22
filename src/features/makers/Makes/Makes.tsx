import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getMakes, selectManufacturerById } from 'features/makers/makersSlice';

export default function Makes() {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const makerId = Number(params.id);
  const manufacturer = useAppSelector(selectManufacturerById(makerId));

  useEffect(() => {
    if (!manufacturer?.makes) {
      dispatch(getMakes({ makerId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!manufacturer) {
    return (
      <div>
        <Link to="/">Go back</Link>
        <p>Manufacturer not found.</p>
      </div>
    );
  }

  const { id, commonName, country, makes } = manufacturer;
  return (
    <div>
      <Link to="/">Go back</Link>
      <h2>Manufacturer details</h2>
      <p>
        <b>ID:</b> {id}
      </p>
      <p>
        <b>Common name:</b> {commonName}
      </p>
      <p>
        <b>Country:</b> {country}
      </p>
      <p>
        <b>Makes:</b>
      </p>
      {!makes && 'Loading...'}
      {makes && (
        <ul>
          {makes.map((make) => (
            <li key={make}>{make}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
