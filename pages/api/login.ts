export default async function loginHandler(req, res) {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "400 - Bad Request" });
  }

  try {
    const result = await fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!result.ok) {
      throw new Error(
        `Não foi possível obter os dados do usuário "${username}"`
      );
    }

    const userInfo = await result.json();

    res.status(200).json({
      id: userInfo.id,
      name: userInfo.name,
      username: userInfo.login,
      avatarUrl: userInfo.avatar_url,
      userProfileUrl: userInfo.html_url,
    });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
}
