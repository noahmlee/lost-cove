---
Title: Computer Graphics Overview
draft:
tags:
  - computer-science
  - graphics
---

## Summary

3D computer graphics are produced through a pipeline of technologies that transform 3D data into a 2D image on a screen. Key stages in this pipeline include **vertex shading**, **rasterization**, **hidden-surface removal**, **anti-aliasing**, and **fragment shading**. Together, these steps convert geometric data into colored pixels that form the final image.

---

## Vertex Shading

The purpose of vertex shading is to transform the geometry of a 3D scene into a 2D representation from the camera’s point of view.

Although 3D objects in games may appear complex, they are composed almost entirely of **triangles**, which are defined by **vertices**. Each vertex has attributes such as position, color, texture coordinates, and normals. During vertex shading, each vertex is processed individually and transformed through several coordinate spaces:

`Model Space → World Space → View (Camera) Space → Clip Space → Screen Space`

These transformations are performed using **transformation matrices**:

- **Model matrix**: places the object in the world (position, rotation, scale)
- **View matrix**: positions and orients the camera
- **Projection matrix**: applies perspective using the camera’s field of view (FOV)

The vertex’s `(x, y, z)` coordinates are multiplied by these matrices to determine where the vertex appears on the screen. Once this process is completed for three vertices, a transformed triangle is ready for rasterization.

---

## Rasterization

Rasterization is the process of converting transformed triangles into **fragments**, which correspond to potential pixels on the screen.

Using the screen-space `x` and `y` coordinates of a triangle’s vertices, the GPU determines which pixels the triangle covers. For each covered pixel, a fragment is generated. At this stage:

- Fragments inherit interpolated data (such as color, texture coordinates, and depth)
- Textures and base colors may be applied
- No final pixel is written yet

This process is repeated for every triangle in the scene.

Once fragment shading is complete, the final color values are written to the **framebuffer**, a temporary memory buffer that stores color (and depth) information for every pixel on the screen. When rendering finishes, the framebuffer is sent to the display.

---

## The Hidden-Surface Problem

In a 3D scene, some geometry is hidden behind other geometry. For example, when rendering a car in front of a brick wall, much of the wall and the back side of the car should not appear in the final image.

Determining which surfaces are visible is known as the **hidden-surface problem**.

This is solved using a **Z-buffer** (or **depth buffer**). During rasterization, each fragment has an associated depth value (its distance from the camera). For each pixel position:

- The Z-buffer stores the depth of the closest fragment seen so far
- If a new fragment is closer, it replaces the previous one
- If it is farther away, it is discarded

This ensures that only the nearest visible surfaces are drawn.

---

## Anti-Aliasing

When rasterizing triangles, a pixel is typically considered either fully inside or fully outside a triangle. This causes **aliasing**, which appears as jagged or stair-stepped edges, especially along diagonal or curved lines.

**Anti-aliasing** techniques reduce these artifacts by smoothing edges.

There are two broad categories of anti-aliasing:

### Spatial Anti-Aliasing

Spatial anti-aliasing works by rendering the scene at a higher resolution or by sampling multiple points per pixel. Examples include **supersampling (SSAA)** and **multisample anti-aliasing (MSAA)**.

- More samples are taken around pixel edges
- Final pixel colors are averaged
- Produces very high image quality
- Computationally expensive

### Post-Process Anti-Aliasing

Post-process anti-aliasing is applied after the scene has been rendered. The GPU analyzes the final image to detect edges and smooth them. Examples include **FXAA** and **TAA**.

- Much faster and more performance-friendly
- Works by blurring or blending detected edges
- Generally lower visual quality than spatial methods

---

## Fragment Shading

Fragment shading determines the final color of each fragment based on lighting and material properties.

A simple and common lighting model is **Lambertian (diffuse) shading**, where a surface appears brighter when it faces a light source and darker when it faces away.

To compute this, we need:
- The **light direction**
- The **surface normal** (a vector perpendicular to the surface)

The brightness is calculated using the cosine of the angle between these two vectors:
`cos(θ) = N · L`
Where:
- `N` is the surface normal
- `L` is the light direction

The cosine value:
- Is `1` when the surface faces the light
- Is `0` when the surface is perpendicular
- Is clamped to `0` to avoid negative lighting

A basic lighting equation looks like this:
`Final Color = M × (I × max(0, cos(θ)) + A)`
Where:
- `M` = material color (RGB)
- `I` = light intensity
- `A` = ambient light contribution

If multiple light sources are present, their contributions are summed before being applied to the material. Because lighting calculations are expensive, real-time graphics typically limit the number and influence of lights.

---

### Flat Shading vs. Smooth Shading

With **flat shading**, each triangle uses a single surface normal, causing the entire triangle to have one uniform color. This makes curved surfaces appear faceted and unrealistic.

**Smooth shading** improves this by assigning a normal to each vertex. These vertex normals are computed as the average of the normals of adjacent triangles. During rasterization, **barycentric interpolation** is used to smoothly blend these normals across the triangle, allowing lighting to vary per fragment.

This results in much smoother, more realistic lighting, especially on curved objects like spheres and characters.
