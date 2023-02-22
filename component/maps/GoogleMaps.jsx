import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Autocomplete, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { toast } from 'react-toastify';

function GoogleMaps({ value, height = '800px', onChange, hideAutocomplete = false }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
        libraries: ['places'],
    });
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(() => value);

    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const searchBox = useRef(null);

    // định vị vị trí
    const marker = useMemo(() => {
        if (isLoaded) {
            if (!value) {
                return null;
            }

            if (value.lat && value.lng) {
                return new window.google.maps.LatLng(value);
            }

            return value;
        }
    }, [value, isLoaded]);

    const handleClick = (e) => {
        onChange(e.latLng);
    };

    const onLoad = useCallback((map) => {
        // check lần đầu tiên có vị trí ko nếu ko có thì nó sẻ loading
        if (!value) {
            setIsFindingLocation(true);
            // nếu ko có định vị, vị trí thì nó set 1 vị trí mặc định và tắt loading
            if (!navigator.geolocation) {
                setCenter({ lat: 10.8105831, lng: 106.7091422 });
                setIsFindingLocation(false);
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // lấy ra vị trí hiện tại
                        setCenter({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setIsFindingLocation(false);
                    },
                    () => {
                        setCenter({ lat: 10.8105831, lng: 106.7091422 });
                        setIsFindingLocation(false);
                    },
                );
            }
        }

        setMap(map);
        // loại bỏ tầm vì nó sẽ được sửa
        // eslint-disable-next-line
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const handlePlaceChanged = () => {
        const place = searchBox.current?.getPlace();
        if (place?.name && map) {
            if (!place?.geometry || !place?.geometry?.location) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                toast.error('No location details available. Please re-enter');

                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            onChange(place.geometry.location);
        }
    };

    const handleLoad = () => {};
    const onLoadAutoComplete = (ref) => {
        searchBox.current = ref;
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: height,
            }}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleClick}
        >
            {!hideAutocomplete && (
                <Autocomplete onLoad={onLoadAutoComplete} onPlaceChanged={handlePlaceChanged}>
                    <input
                        type="search"
                        placeholder="Enter exact location"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-120px',
                        }}
                    />
                </Autocomplete>
            )}
            {marker && <MarkerF position={marker} onLoad={handleLoad} />}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(GoogleMaps);
