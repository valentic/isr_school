COPY (

SELECT
    a.id,
    a.firstname,a.lastname,
    a.email,a.phonenumber,
    a.university,
    a.city, a.state, a.country,
    d.description,
    a.field,
    a.graduation,
    p.description,
    a.supervisor_name,
    a.supervisor_email,
    a.supervisor_phone,
    a.why_attend,
    a.experience,
    a.research_area,
    a.other,
    a.created_on
FROM
    applications as a
LEFT JOIN
    degrees as d ON a.degree_id=d.id
LEFT JOIN
    housing_prefs as p ON a.housing_pref_id=p.id
ORDER BY
    id
) TO
    STDOUT WITH CSV HEADER
